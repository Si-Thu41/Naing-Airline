import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchFlight() {
    const [cityList, setCityList] = React.useState([]);
    const [flightRoute, setFlightRoute] = React.useState({from: "", to: ""});
    const [disabled, setDisabled] = React.useState(true);
    const [departureDate, setDepartureDate] = React.useState();
    const navigate=useNavigate();

    async function fetchCityList() {
        //fetch city list from backend
        const response = await fetch("http://localhost:3000/api/cities");
        const data = await response.json();
        setCityList(data);
    }
   function handleSubmit(event){
        event.preventDefault();
        const bookingdetails={from: flightRoute.from, to: flightRoute.to, departureDate};//to store booking details and pass to search flight page
        navigate('/searchFlight',{state:bookingdetails});//navigate to search flight page and pass booking details as state
        
   }
    React.useEffect(() => {
        fetchCityList();
    }, []);

    function handleCitySelect(event) {
        const selectedCity = event.target.value;
        

        setFlightRoute((prevValues) => {
        const updatedRoute = { ...prevValues, [event.target.name]: selectedCity };
        
        // update disabled state based on the *new* values
        setDisabled(updatedRoute.from === "" ||updatedRoute.to === "" ||updatedRoute.from === updatedRoute.to );
        console.log("Date:",departureDate);
        return updatedRoute;
        
        });
    }

  return <div className="bg-slate-200 lg:w-[90%] mx-auto">
    <form className="flex justify-center items-center " onSubmit={handleSubmit}>
       <select id="departureCity" name="from" className="border border-gray-300 rounded-md p-2 m-2" onChange={handleCitySelect}  value={flightRoute.from} >
        <option value="" disabled>Select departure city</option>
        {cityList.map((city) => (
            <option key={city.city_id} value={city.cityname}>{city.cityname}</option>
        ))}
       </select>
        <select id="arrivalCity" name="to" className="border border-gray-300 rounded-md p-2 m-2" onChange={handleCitySelect}  value={flightRoute.to} >
            <option value="" disabled>Select arrival city</option>
          {cityList.map((city) => (
            <option key={city.city_id} value={city.cityname}>{city.cityname}</option>
          ))}
        </select>
        <input type="date" name="departureDate" value={departureDate?departureDate:""} onChange={(e) => setDepartureDate(e.target.value)} required className="border border-gray-300 rounded-md p-2 m-2" />
        <button type="submit" className={`${disabled ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} text-white rounded-md p-2 m-2 `} disabled={disabled}>Search Flights</button>
    </form>

  </div>;
}
export default SearchFlight;