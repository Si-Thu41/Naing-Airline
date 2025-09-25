import React from 'react';
import { useLocation } from 'react-router-dom';

function BookFlight(){
    const location=useLocation();
    const bookingDetail=location.state;
    const [cities, setCities] = React.useState([]); 
    const [flightDetail,setFlightDetail]=React.useState({});   
    async function fetchFlightById(flightId){
        try{
            const response=await fetch(`http://localhost:3000/searchFlightById?flightId=${flightId}`);
            const data=await response.json();
            setFlightDetail(data);
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

    React.useEffect(()=>{
        fetchFlightById(bookingDetail.flightId);
        fetchCityName();
    },[]);
    return <div>
        <form className='xl:w-[30%] mx-auto text-center flex flex-col gap-4'>
            <h1>{bookingDetail.airlinename}</h1>
            <input type="text" placeholder='Enter your name' className='flex-0' required/>
            <input type="text" placeholder='Enter your passport number'  required/>
            <p>Please Check The Flight Detail</p>
            <div className='flex justify-center items-center gap-2'>
               <input type="text" name="departureCity" value={cities.find(c => c.city_id === bookingDetail.departureCity)?.cityname || "Unknown City"} readOnly size={ (cities.find(c => c.city_id === bookingDetail.departureCity)?.cityname || "Unknown City").length }/>
               <img className='w-4 inline' src="airplane.png" alt="Airplane icon" />
            <input type="text" name='arrivalCity' value={cities.find(c=>c.city_id===bookingDetail.arrivalCity)?.cityname || "Unknown City"}  readOnly size={ (cities.find(c=>c.city_id===bookingDetail.arrivalCity)?.cityname || "Unknown City").length }/>
            </div>
            <input type="text" name="flightNumber" value={flightDetail.flight_number || ""} readOnly />
            <input type="text" name="travelClass" value={bookingDetail.travelClass || ""} readOnly />
            <input type="text" name="price" value={bookingDetail.travelClass==="economy" ? flightDetail.economyprice ? flightDetail.economyprice.toLocaleString() + " MMK" : "" : bookingDetail.travelClass==="business" ? flightDetail.businessprice ? flightDetail.businessprice.toLocaleString() + " MMK" : "" : ""} readOnly />
            <button type='submit' className='bg-green-500 hover:bg-green-600 text-white rounded-md p-2 m-2 '>Confirm Booking</button>
        </form>
    </div>;
}

export default BookFlight;