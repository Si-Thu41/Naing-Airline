import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BookFlight(){
    const location=useLocation();
    const navigate=useNavigate();
    const bookingDetail=location.state;
    const [cities, setCities] = React.useState([]); 
    const [flightDetail,setFlightDetail]=React.useState({});
    
    async function fetchFlightById(flightId){
        try{
            const response=await fetch(`http://localhost:3000/api/searchFlightById?flightId=${flightId}`);
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
        console.log("Cities",data);
        console.log("Booking Detail:",bookingDetail);
      } catch (error) {
        console.error("Error fetching city name:", error); 
      }
    };

    React.useEffect(()=>{
        fetchFlightById(bookingDetail.flight_id);
        fetchCityName();
    },[]);

    const [formData, setFormData] = React.useState({
        name: '',
        passportNumber: '',
        departureCity: '',
        arrivalCity: '',
        flightNumber: '',
        flight_id: '',
        travelClass: '',
        price: ''
    });

    React.useEffect(() => { //Set values for formData once the DOM is loaded
        setFormData(prev => ({
            ...prev,
            departureCity: cities.find(c=>c.city_id===bookingDetail.departureCity)?.cityname || "Unknown City",
            arrivalCity: cities.find(c=>c.city_id===bookingDetail.arrivalCity)?.cityname || "Unknown City",
            flightNumber: flightDetail.flight_number || '',
            flight_id: bookingDetail.flight_id || '',
            travelClass: bookingDetail.travelClass || '',
            price: bookingDetail.travelClass==="economy"
                ? (flightDetail.economyprice ? flightDetail.economyprice : "")
                : bookingDetail.travelClass==="business"
                    ? (flightDetail.businessprice ? flightDetail.businessprice : "")
                    : ""
        }));
    }, [cities, flightDetail, bookingDetail]); // Update formData when cities or flightDetail change

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event){
        event.preventDefault();
        await fetch('http://localhost:3000/api/confirmBooking',{
            credentials: 'include',
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        navigate('/bookingComplete',{state: {bookingDetail, formData}});
    }
    return <div>
        <form className='xl:w-[30%] mx-auto mt-20 text-center flex flex-col gap-4' onSubmit={handleSubmit}>
            
            <input name="name" type="text" placeholder='Enter your name' className='flex-0' required onChange={handleInputChange}/>
            <input name="passportNumber" type="text" placeholder='Enter your passport number'  required onChange={handleInputChange}/>
            <p>Please Check The Flight Detail</p>
            <div className='flex justify-center items-center gap-2'>
               <input type="text" name="departureCity" value={cities.find(c => c.city_id === bookingDetail.departureCity)?.city || "Unknown City"} readOnly size={ (cities.find(c => c.city_id === bookingDetail.departureCity)?.city || "Unknown City").length }/>
               <img className='w-4 inline' src="airplane.png" alt="Airplane icon" />
            <input type="text" name='arrivalCity' value={cities.find(c=>c.city_id===bookingDetail.arrivalCity)?.city || "Unknown City"}  readOnly size={ (cities.find(c=>c.city_id===bookingDetail.arrivalCity)?.city || "Unknown City").length }/>
            </div>
            <input type="text" name="flightNumber" value={flightDetail.flight_number || ""} readOnly />
            <input type="text" name="travelClass" value={bookingDetail.travelClass || ""} readOnly />
            <input type="text" name="price" value={bookingDetail.travelClass==="economy" ? flightDetail.economyprice ? flightDetail.economyprice.toLocaleString() + " MMK" : "" : bookingDetail.travelClass==="business" ? flightDetail.businessprice ? flightDetail.businessprice.toLocaleString() + " MMK" : "" : ""} readOnly />
            <button type='submit' className='bg-green-500 hover:bg-green-600 text-white rounded-md p-2 m-2 '>Confirm Booking</button>
        </form>
    </div>;
}

export default BookFlight;