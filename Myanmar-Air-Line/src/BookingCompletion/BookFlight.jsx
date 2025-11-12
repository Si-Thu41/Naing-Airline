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
    const [confirmButton,setConfirmButton]=React.useState([]);
    const [allConfirmed,setAllConfirmed]=React.useState(false);
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
    function checkSavePassengerInfo(index){
        let updatedButton=[...confirmButton];
        updatedButton[index].status=true;
        setConfirmButton(updatedButton);
    }
    function toggleConfirmButton(){
        let tempStatus=true;
        for (let i=0; i<passengerArray.length; i++){
            if(confirmButton[i].status==false){
                tempStatus=false;
                break;
            }else if(confirmButton[i].status==true){
                tempStatus=true;
            }
        }
        setAllConfirmed(tempStatus)
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
        let button=[];
        for(let i=1;i<=bookingDetail.passengercount;i++){
            passengers.push(i);
            button.push({
                passengerNumber: i,
                status: false
            });
        }
        setPassengerArray(passengers);
        setConfirmButton(button)
    },[]);

    React.useEffect(() => { //Set values for formData once the DOM is loaded
        console.log(bookingDetail.passengercount);
    }, [cities, flightDetail, bookingDetail]); // Update formData when cities or flightDetail change

    return  <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-1 flex flex-col items-center gap-5 py-6'>
            {passengerArray.length==1?<TravelerInfoForm toggleConfirmButton={toggleConfirmButton} checkSavePassengerInfo={checkSavePassengerInfo} passengerNumber={1} multiplePassenger={false} flightType={bookingDetail.flightType} travelClass={bookingDetail.travelClass} flightId={bookingDetail.flight_id}/> : passengerArray.map((passengerNumber)=>
            <TravelerInfoForm key={passengerNumber} toggleConfirmButton={toggleConfirmButton} checkSavePassengerInfo={checkSavePassengerInfo} passengerNumber={passengerNumber} multiplePassenger={true} flightType={bookingDetail.flightType} travelClass={bookingDetail.travelClass} flightId={bookingDetail.flight_id}/>
            )}
            {allConfirmed ? null : <p className='text-red-600'>Please save your passenger info to continue!</p>}
            <button disabled={!allConfirmed} className='text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-500 bg-blue-600 rounded-md p-2' onClick={()=>{navigate("/payment")}}>Confirm</button>
          </main>
        <Footer />
    </div>;
}

export default BookFlight;