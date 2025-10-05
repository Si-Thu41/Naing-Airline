import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function SearchFlight({customClass="",from,to,date,show=true}) {
  
    const [cityList, setCityList] = React.useState([]);
    const [flightRoute, setFlightRoute] = React.useState({from: from || "", to: to || ""});
    const [disabled, setDisabled] = React.useState(true);
    const [flightdate, setFlightDate] = React.useState(date || "");
    const [passengerCount, setPassengerCount] = React.useState(1);
    const navigate=useNavigate();

    async function fetchCityList() {
        //fetch city list from backend
        try {
            const response = await fetch("http://localhost:3000/api/cities");
            if (response.ok) {
                const data = await response.json();
                setCityList(data);
            } else {
                navigate('/error', { state: { error: response.statusText, status: response.status } });
            }
        } catch (error) {
            console.error("Error fetching city list:", error);
            navigate('/error', { state: { error: "Error fetching city list", status: 500 } });
        }
    }

   function handleSubmit(event){
        event.preventDefault();
        const bookingdetails={from: flightRoute.from, to: flightRoute.to, flightdate, passengerCount};//to store booking details and pass to search flight page
        navigate('/searchFlight',{state:bookingdetails});//navigate to search flight page and pass booking details as state
   }
   function checkSameCity(){ //only for calling from SearchFlightResult
    const departureCitySelect = document.querySelector('select[name="from"]');
    const arrivalCitySelect = document.querySelector('select[name="to"]');
    if(departureCitySelect && arrivalCitySelect){
    if(departureCitySelect.value === arrivalCitySelect.value){
      setDisabled(true);
    }else if(departureCitySelect.value !== "" && arrivalCitySelect.value !== ""){
      setDisabled(false);
    }
   }
  }
    React.useEffect(() => {
        fetchCityList();
        checkSameCity();
    }, [passengerCount,flightdate]);

    function handleCitySelect(event) {
        const selectedCity = event.target.value;
        setFlightRoute((prevValues) => {
        const updatedRoute = { ...prevValues, [event.target.name]: selectedCity };     
        // update disabled state based on the *new* values
        setDisabled(updatedRoute.from === "" ||updatedRoute.to === "" ||updatedRoute.from === updatedRoute.to );
        return updatedRoute;
        });
    }
    function addPassenger(){
      if(passengerCount<10){
        setPassengerCount(prev=>prev+1);
      }
    }

    function removePassenger(){
      if(passengerCount>1){
        setPassengerCount(prev=>prev-1);
      }
    }
  if(!show) return null;
  return (
  <div className={`bg-slate-200 lg:w-[90%] mx-auto mt-5 rounded-md shadow-md ${customClass}`}>
    <form className="flex justify-center items-center gap-4 text-orange-700" onSubmit={handleSubmit}>
        <div className='grid grid-cols-2'>
          <select id="departureCity" name="from" className="border-2 border-gray-400 rounded-md p-2 m-2" onChange={handleCitySelect}  value={flightRoute.from} >
        <option value="" disabled>Select departure city</option>
        {cityList.map((c) => (
            <option key={c.city_id} value={c.city}>{c.city}</option>
        ))}
       </select>
        <select id="arrivalCity" name="to" className="border-2 border-gray-400 rounded-md p-2 m-2" onChange={handleCitySelect}  value={flightRoute.to} >
            <option value="" disabled>Select arrival city</option>
          {cityList.map((c) => (
            <option key={c.city_id} value={c.city}>{c.city}</option>
          ))}
        </select>
        <input type="date" name="flightdate" value={flightdate?flightdate:""} onChange={(e) => setFlightDate(e.target.value)} required className="border-2 border-gray-400 rounded-md p-2 m-2" />
        <div className='flex items-center'>
            <label htmlFor="passengerCount">Passengers:</label>
            <input type="number" name="passengerCount" min="1" max="10" value={passengerCount} className="border-2 border-gray-400 rounded-md p-2 m-2 w-20 text-center" readOnly />
            <div className='flex flex-col gap-2'>
              <AddCircleIcon fontSize="small" className='cursor-pointer' onClick={addPassenger} />
              <RemoveCircleIcon fontSize="small" className='cursor-pointer' onClick={removePassenger} />
            </div>
        </div>
        </div>
        <button type="submit" className={`${disabled ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white rounded-md p-2 m-2 `} disabled={disabled}>Search Flights</button>
    </form>

  </div>);
}

export default SearchFlight;