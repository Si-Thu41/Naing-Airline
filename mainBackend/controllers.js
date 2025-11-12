import pool from './db.js';

export const getCity= async (req,res)=>{
    try {
    const result = await pool.query('SELECT city_id, city, code FROM cities ORDER BY city_id ASC;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchFlight= async (req,res)=>{try{const {from,to,departureDate}=req.query;
  const getFromCityIdQuery = await pool.query(`SELECT city_id FROM cities WHERE city=$1`, [from]);
  const getToCityIdQuery = await pool.query(`SELECT city_id FROM cities WHERE city=$1`, [to]);
  const searchFlightQuery= await pool.query(`SELECT f.*, c1.type AS departureCityType, c2.type AS arrivalCityType FROM flights f JOIN cities c1 ON f.departureCity = c1.city_id JOIN cities c2 ON f.arrivalCity = c2.city_id WHERE f.departureCity=$1 AND f.arrivalCity=$2 AND f.flightdate=$3`, [getFromCityIdQuery.rows[0].city_id,getToCityIdQuery.rows[0].city_id,departureDate]);
  if(req.session.passengerInfo){
    delete req.session.passengerInfo; //If there is any previous passenger info in session, delete it to avoid conflicts
  }
  res.json(searchFlightQuery.rows);
}catch(error){
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchFlightById= async (req,res)=>{
    try{
    const {flightId}=req.query;
    const result= await pool.query("Select * from flights where flight_id=$1",[flightId]);
    if(req.session.passengerInfo){
      delete req.session.passengerInfo; //If there is any previous passenger info in session, delete it to avoid conflicts
    }
    res.json(result.rows[0]);
  }catch(error){
    console.error('Error searching flight by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const saveTravelerInfo= async (req,res)=>{ //Save the traveler info in session for booking after the payment is successful
  try{
    console.log(req.user)
    if(!req.session.passengerInfo){
      req.session.passengerInfo=[];
    }
    req.session.passengerInfo.push(req.body);
    res.status(200).json({ message: 'Traveler info saved successfully' });
  }catch(error){
    console.error('Error saving traveler info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const bookFlight= async (req,res)=>{
  try{
    for (const passenger of req.session.passengerInfo){
      const insertQuery= `INSERT INTO bookings (flight_id, user_id, travelClass, title, passengerfirstName, passengermiddleName, passengerlastName, passportNumber, national_id_number) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING booking_id`;
      const values=[passenger.flight_id, req.user.user_id, passenger.travelClass,passenger.title,passenger.firstName,passenger.middleName,passenger.lastName,passenger.passportNumber,passenger.national_id_number];
      await pool.query(insertQuery,values);

        // Clear passengers in session after booking is done
      delete req.session.passengerInfo;

      res.json({ success: true })
    }
  }catch(error){
    console.error('Error booking flight:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const seeBookings= async (req,res)=>{
  try{
    const {user_id}= req.user
    const response= await pool.query(`SELECT b.booking_id,b.travelclass, f.* FROM bookings b JOIN flights f ON b.flight_id = f.flight_id WHERE b.user_id=$1`,[user_id]);
    res.json(response.rows);
  }catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
  }
}