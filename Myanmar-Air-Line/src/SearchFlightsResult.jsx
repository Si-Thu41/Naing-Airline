import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FlightDetail from './components/FlightDetail';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SearchFlight from './components/SearchFlight';
import {MagnifyingGlass} from 'react-loader-spinner';

function SearchFlightsResult() {
    const location = useLocation();
    const [flight, setFlight] = React.useState([]);
    const bookingdetails = location.state;
    const [cities, setCities] = React.useState([]);
    const [showFlightDetail, setShowFlightDetail] = React.useState(false);
    const [showEditFlight, setShowEditFlight] = React.useState(false);
    const [dataToDisplay, setDataToDisplay] = React.useState(null);
    const [loading, setLoading] = React.useState(true); // <-- Add loading state
    const navigate = useNavigate();

    async function fetchFlights() {
        try {
            const response = await fetch(`http://localhost:3000/api/searchFlight?from=${bookingdetails.from}&to=${bookingdetails.to}&departureDate=${bookingdetails.flightdate}`);
            if (response.ok) {
                const data = await response.json();
                setFlight(data);
            } else {
                navigate('/error',{state:{error:response.statusText,status:response.status}});
            }
        } catch (error) {
            console.log("There is an error fetching the data from the database: ", error);
            navigate('/error',{state:{error:"Error fetching flight data",status:500}});
        }
    }

    async function fetchCityName() {
        try {
            const response = await fetch(`http://localhost:3000/api/cities`);
            if (response.ok) {
                const data = await response.json();
                setCities(data);
            } else {
                navigate('/error', { state: { error: response.statusText, status: response.status } });
            }
        } catch (error) {
            console.error("Error fetching city name:", error);
            navigate('/error', { state: { error: "Error fetching city name", status: 500 } });
        }
    }

    async function loadData() {
        setLoading(true);
        await Promise.all([fetchFlights(), fetchCityName()]);
        setTimeout(() => setLoading(false), 3000); // Simulate a short delay for better UX
    }

    React.useEffect(() => {
        loadData();
        setShowEditFlight(false);
    }, [bookingdetails]);

    function handleBookFlight(flight_id, travelClass, departureCity, arrivalCity) {
        navigate('/bookFlight', { state: { flight_id, travelClass, departureCity, arrivalCity } });
    }
    function displayFlightDetail(id) {
        const flightDetail = flight.find(f => f.flight_id === id);
        setDataToDisplay(flightDetail);
        setShowFlightDetail(true);
    }
    function close() {
        setShowFlightDetail(false);
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center w-full">
                <Header />
                <div className='flex-1 flex flex-col justify-center items-center'>
                    <MagnifyingGlass visible={true} height="80" width="80" ariaLabel="magnifying-glass-loading" wrapperStyle={{}} wrapperClass="magnifying-glass-wrapper" glassColor="#c0efff" color="#e47418ff" />
                </div>

                <Footer />
            </div>
        );
    }

  return < div className='relative flex flex-col min-h-screen w-full' >
    <Header customClass={`${showFlightDetail ? 'brightness-25 opacity-50' : ''}`}/>
      <FlightDetail flightDetail={dataToDisplay} close={close} show={showFlightDetail} departureCity={bookingdetails.from} arrivalCity={bookingdetails.to} />
     
    <div className='flex flex-row gap-5 items-center'>
      <h1 className={`p-5 text-3xl font-bold ${showFlightDetail ? 'brightness-25 opacity-50' : ''}`}>{bookingdetails.from} ({cities.find(c=>c.city===bookingdetails.from)?.code}) <img className='w-4 inline' src="airplane.png" alt="Airplane icon" /> {bookingdetails.to} ({cities.find(c=>c.city===bookingdetails.to)?.code}) </h1>
      <div className='flex flex-row gap-2 items-center p-5'>
        <PersonIcon fontSize='large'/> <span className='font-semibold text-lg'>{bookingdetails.passengerCount}</span>
      </div>
      <div onClick={() => showEditFlight?setShowEditFlight(false):setShowEditFlight(true)} className='cursor-pointer'>
        <EditIcon fontSize='small'  /><span>{showEditFlight ? 'Cancel' : 'Edit'}</span>
      </div>
      
    </div>
    <SearchFlight show={showEditFlight} from={bookingdetails.from} to={bookingdetails.to} date={bookingdetails.flightdate} />
      {flight.length===0 ? <div className='flex-1'>
        <h1 className='p-5 text-2xl '>Sorry for any inconvenience. We do not have any flights of your requested route available at the moment.</h1>
        <button className='m-5 bg-orange-600 text-white text-left py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-500' onClick={()=>navigate(-1)}>Back to Search</button>
      </div> :
  <main className={`bg-slate-100 flex flex-col xl:justify-start justify-center gap-4 p-4 flex-1 ${showFlightDetail ? 'brightness-25 opacity-50' : ''}`}>

      {flight.map((flight) => (
        <div key={flight.flight_id} className="border border-orange-400 rounded-md bg-slate-200 xl:w-[80%] max-h-fit p-4 shadow-md flex flex-row gap-7">
          <div className='flex flex-rows justify-between flex-1'>
            <div className='text-center '>
              <p className='text-2xl'>{flight.departuretime}</p> 
              <p>{cities.find(c=>c.city_id===flight.departurecity)?.code ||"Unknown Code"}</p>
            </div> 

            <div> 
              <div className='flex flex-row justify-center items-center'><HorizontalRuleIcon /><img className='w-4 inline' src="airplane.png" alt="Airplane icon" /><HorizontalRuleIcon /></div>
              <div className='flex items-center text-blue-500 cursor-pointer' onClick={() => displayFlightDetail(flight.flight_id)}><InfoIcon/><p >See Flight Details</p></div>
            
            </div>
            
            <div className='text-center'>
              <p className='text-2xl'>{flight.arrivaltime}</p> 
              <p>{cities.find(c=>c.city_id===flight.arrivalcity)?.code ||"Unknown Code"}</p>
            </div> 
          </div> 
          <div className='grid grid-cols-2 gap-2 xl:mt-2'>
            <button className='bg-orange-600 text-white text-left py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-500' onClick={() => handleBookFlight(flight.flight_id, 'economy',flight.departurecity,flight.arrivalcity)}><p className='text-sm'>Economy</p> <p>{flight.economyprice.toLocaleString()} MMK</p></button>
            <button className='bg-orange-600 text-white text-left py-2 px-4 rounded-xl cursor-pointer hover:bg-orange-500' onClick={() => handleBookFlight(flight.flight_id, 'business',flight.departurecity,flight.arrivalcity)}><p className='text-sm'>Business</p> <p>{flight.businessprice.toLocaleString()} MMK</p></button>
            <p className='text-sm text-red-500 col-span-2'>Please note that the prices shown are for one passenger only.</p>
          </div>
          
        </div>
      ))} 
  </main>}
  <Footer />
  </div>
    }

export default SearchFlightsResult;