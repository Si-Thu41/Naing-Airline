import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchCityList } from '../Functions/getCities';

function BookFlight(){
    const location=useLocation();
    const navigate=useNavigate();
    const bookingDetail=location.state;
    const [cities, setCities] = React.useState([]); 
    const [flightDetail,setFlightDetail]=React.useState({});
    
    async function fetchFlightById(flightId){
        try{
            const response=await fetch(`http://localhost:3000/api/searchFlightById?flightId=${flightId}`,{
                method: "GET",
                credentials: "include"
            });
            const data=await response.json();
            setFlightDetail(data);
        }catch(error){
            console.log("There is an error fetching the data from the database: ",error);
        }
    }

    React.useEffect(()=>{
        fetchFlightById(bookingDetail.flight_id);
        const fetchCity= async()=>{
            const result = await fetchCityList();
            if(result.cities){
                setCities(result.cities);
            }else{
                navigate('/error',{state: {error: result.errorMessage}});
            }
        }
        fetchCity();
    },[]);

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

    return <div>
        
    </div>;
}

export default BookFlight;