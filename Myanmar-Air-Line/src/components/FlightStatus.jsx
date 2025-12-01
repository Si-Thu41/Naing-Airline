import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
function FlightStatus({ status }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [flightnumber, setFlightnumber] = React.useState(location.state?.flightnumber || null);
    const [flightstatus, setStatus]=React.useState();
    async function fetchFlightStatus(flightnumber) {
        try{
            const result =await fetch (`http://localhost:3000/api/flight-status?flightnumber=${flightnumber}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            } });
            if(!result.ok){
                navigate('/error', { state: { error: result.statusText, status: result.status } });
                return;
            }
            const data = await result.json();
            setStatus(data.flightstatus);
        }catch(error){
            console.log("Error fetching flight status: ", error);
            navigate('/error', { state: { error: 'Cannot connect to the database', status: 500 } });
        }
    }
    return (
        <div className='w-[50%] m-auto'>
            <input autoFocus className='rounded-md border-1 border-gray-400 focus:outline-orange-500 p-1 mx-2' type="text" value={flightnumber} onChange={(e) => setFlightnumber(e.target.value)} placeholder="Enter Flight Number" />
            <button className='bg-blue-600 p-2 rounded rounded-[8px] text-white' onClick={() => fetchFlightStatus(flightnumber)}>Check Status</button>
            {flightstatus?<p className='text-white text-xl bg-orange-500 p-2 rounded rounded-[8px] mt-2 '>Your flight is {flightstatus}</p>:''}
        </div>
    )
}
export default FlightStatus;    