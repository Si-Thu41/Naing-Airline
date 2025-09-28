import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


function SearchFlightsResult() {
    const location=useLocation(); //to fetch the state passed from BookAFlight component
    const [data,setData]=React.useState([]);
    const bookingdetails=location.state;
    const [cities, setCities] = React.useState([]);
    const navigate=useNavigate();
    async function fetchFlights(){
      try{
        const response=await fetch(`http://localhost:3000/api/searchFlight?from=${bookingdetails.from}&to=${bookingdetails.to}&departureDate=${bookingdetails.departureDate}`);
        const data=await response.json();
        setData(data);
    }catch(error){
        console.log("There is an error fetching the data from the database: ",error);
      }
    }

    async function fetchCityName(){
      try{
        const response = await fetch(`http://localhost:3000/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching city name:", error); 
      }
    }
    async function handleBookFlight(flightId, travelClass, airlinename, departureCity, arrivalCity) {
      navigate('/bookFlight', { state: { flightId, travelClass, airlinename, departureCity, arrivalCity } });
    }

    React.useEffect(()=>{
      fetchFlights();
      fetchCityName();
    },[]);

  return < div className='flex flex-col min-h-screen' >
    <Header />
    <h1 className='p-5 text-3xl font-bold'>{bookingdetails.from} <img className='w-4 inline' src="airplane.png" alt="Airplane icon" /> {bookingdetails.to}</h1>
      {data.length===0 ? <h1 className='p-5 text-2xl flex-1'>No flights found. Please try different route or date.</h1> :
  <div className='flex flex-wrap xl:justify-start justify-center gap-4 p-4 flex-1'>
      {data.map((flight) => (
        <div key={flight.flight_id} className=" rounded-md bg-slate-200 xl:w-[30%] max-h-fit p-4 shadow-md">
          <h1 className="font-bold ">{flight.airlinename} <img className='inline w-12 h-12 rounded-full' src={flight.logo} alt="Airline Logo" /></h1>
          <p>Flight Number: {flight.flight_number}</p>
          <p>{cities.find(c=>c.city_id===flight.departurecity)?.cityname ||"Unknown City"} <img className='w-4 inline' src="airplane.png" alt="Airplane icon" /> {cities.find(c=>c.city_id===flight.arrivalcity)?.cityname || "Unknown City"}</p>
          <div className='flex gap-2 xl:mt-2'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600' onClick={() => handleBookFlight(flight.flight_id, 'economy',flight.airlinename,flight.departurecity,flight.arrivalcity)}>Book Economy {flight.economyprice.toLocaleString()} MMK</button>
            <button className='bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600' onClick={() => handleBookFlight(flight.flight_id, 'business',flight.airlinename,flight.departurecity,flight.arrivalcity)}>Book Business {flight.businessprice.toLocaleString()} MMK</button>
          </div>
          
        </div>
      ))} 
  </div>}
  <Footer />
  </div>
    }

export default SearchFlightsResult;