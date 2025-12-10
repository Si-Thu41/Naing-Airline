import Footer from "./Footer";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../Functions/backendurl.js';

function Login() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    const navigate = useNavigate();
        React.useEffect(() => {
        try{fetch(`${API_BASE_URL}/checkAuth`, {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        })}catch(error){
            console.log("Error in Login Page:",error);
            setIsAuthenticated(false);
        }
    }, []);
    if (isAuthenticated) {
        navigate("/", { replace: true });
        return null;
    }
    return (<div className="flex flex-col min-h-screen">
    <div className="flex-1 w-full md:w-[50%] text-center mt-20 md:mt-[25%] xl:mt-[18%] flex flex-col items-center mx-auto">
        <p className="sm:text-3xl text-4xl">Welcome to <img src="naing-high-resolution-logo-transparent.png" alt="Logo" className="w-[100px] inline" /></p>
        <a href="http://localhost:3000/auth/google">
            <button className="border-2 border-orange-700 text-orange-700 rounded-md p-2 m-2 cursor-pointer hover:border-none hover:bg-orange-400 hover:text-white">
                  <img src="google.png" alt="Google Logo" className="w-7 inline mr-2" />
                Continue with Google</button>
        </a>
    </div>
    <Footer />
    </div>);
}

export default Login;