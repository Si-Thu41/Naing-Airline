import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchCityList } from '../Functions/getCities';
import TravelerInfoForm from './TravelerInfoForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

function BookFlight(){
    const location=useLocation();
    const navigate=useNavigate();
    const bookingDetail=location.state;
    const [cities, setCities] = React.useState([]); 
    const [flightDetail,setFlightDetail]=React.useState({});
    const [passengerArray,setPassengerArray]=React.useState([]);
    
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
        let passengers=[];
        for(let i=1;i<=bookingDetail.passengercount;i++){
            passengers.push(i);
        }
        setPassengerArray(passengers);
    },[]);

    React.useEffect(() => { //Set values for formData once the DOM is loaded
        console.log(bookingDetail.passengercount);
    }, [cities, flightDetail, bookingDetail]); // Update formData when cities or flightDetail change

    return  <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-1 flex flex-col items-center gap-6 py-6'>
            {passengerArray.length==1?<TravelerInfoForm passengerNumber={null} flightType={bookingDetail.flightType} travelClass={bookingDetail.travelClass} flightId={bookingDetail.flight_id}/> : passengerArray.map((passengerNumber)=>
            <TravelerInfoForm key={passengerNumber} passengerNumber={passengerNumber} flightType={bookingDetail.flightType} travelClass={bookingDetail.travelClass} flightId={bookingDetail.flight_id}/>
            )}
            <button className='cursor-pointer bg-blue-700 rounded-md p-2' onClick={()=>{navigate("/payment")}}>Confirm</button>
          </main>
        <Footer />
    </div>;
}

export default BookFlight;