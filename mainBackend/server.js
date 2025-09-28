import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import router from './router.js';
import GoogleOAuth from 'passport-google-oauth20';
import passport from 'passport';
import pool from './db.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  name: "loginCookie",
  secret:"mysecretkey",
  resave:false,
  saveUninitialized:false, //If true, it will save a session even if there is no modification
  cookie:{
    maxAge:24*60*60*1000,
    secure: false,
    sameSite: 'lax'
  }
}));
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));


app.use("/api",router);

app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));
passport.use('google',new GoogleOAuth.Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
},async function(accessToken,refreshToken,profile,cb){
  try{
    const result=await pool.query("SELECT * FROM users WHERE username=$1",[profile.emails[0].value]);
    if(result.rows.length==0){
      const newUser=await pool.query("INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *",[profile.emails[0].value,profile.id]);
      return cb(null,newUser.rows[0]);
    }else if(result.rows.length==1){
      return cb(null,result.rows[0]);
    }
  }catch(error){
    console.log("Error in Google OAuth",error);
    cb(error,null);
  }
}));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173/loggedin');
  });

  passport.serializeUser((user, done) => { // Storing user info in session
  done(null, user);
});
passport.deserializeUser((user, done) => { // Fetching user info from session
  done(null, user);
});

app.get("/checkAuth",(req,res)=>{
  if(req.user){
    res.json({isLoggedIn:true,user:req.user});
  }else{
    res.json({isLoggedIn:false,user:null});
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Error logging out:", err);
      return res.status(500).json({ message: "Error logging out" });
    }
    req.session.destroy((err) => { // Destroy the session
      if (err) {
        console.log("Error destroying session:", err);
        return res.status(500).json({ message: "Error destroying session" });
      }
      res.clearCookie("loginCookie"); // Clear the cookie
      res.json({ message: "Logged out successfully" }); // Send a success response. Without this response, the client may hang, waiting for a reply.
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. http://localhost:${PORT}/`);
});
