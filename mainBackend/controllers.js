import pool from './db.js';

export const getCity= async (req,res)=>{
    try {
    const result = await pool.query('SELECT city_id, cityname FROM cities ORDER BY city_id ASC;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchFlight= async (req,res)=>{try{const {from,to,departureDate}=req.query;
  const getFromCityIdQuery = await pool.query(`SELECT city_id FROM cities WHERE cityName=$1`, [from]);
  const getToCityIdQuery = await pool.query(`SELECT city_id FROM cities WHERE cityName=$1`, [to]);
  const searchFlightQuery= await pool.query(`SELECT * FROM flights f JOIN airlines a ON f.airline = a.airline_id WHERE f.departureCity=$1 AND f.arrivalCity=$2 AND f.departure_date=$3`, [getFromCityIdQuery.rows[0].city_id,getToCityIdQuery.rows[0].city_id,departureDate]);
  res.json(searchFlightQuery.rows);
}catch(error){
    console.error('Error searching flights:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchFlightById= async (req,res)=>{
    try{
    const {flightId}=req.query;
    const result= await pool.query("Select * from flights f join airlines a on f.airline=a.airline_id where f.flight_id=$1",[flightId]);
    
    res.json(result.rows[0]);
  }catch(error){
    console.error('Error searching flight by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};