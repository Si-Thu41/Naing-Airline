import React from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { fetchCityList } from "../Functions/getCities";

function ShowBooking() {
    const navigate = useNavigate();
    const location = useLocation();
    const [bookings, setBookings] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    async function getBookings(){
        try{
            const response= await fetch("http://localhost:3000/api/seeBookings",{
                method: 'GET',
                credentials:'include'
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(()=>{
                    // console.log(data);
                    return data;
                });
            } else {
                navigate('/error',{state:{error:response.statusText,status:response.status}});
            }
        }catch(error){
            navigate('/error',{state:{error:'Error while connecting the database', status:500}})
        }
    }
    async function fetchCities(){
        const result= await fetchCityList();
        if(result.cityListFetcherror){
            navigate('/error',{state:{error:result.cityListFetcherror || "Unknown error"}});
        }else{
            setCities(result.cities);
        }
    }
    function setFlightDate(booking){
        const date = new Date(booking.flightdate);
        return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
    }
    React.useEffect(()=>{
        getBookings();
        fetchCities();
    },[])

    return <div className="flex flex-col items-center justify-center p-4">
        <table className="table-auto">
            <thead>
                <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-700 p-3">Booking ID</th>
                    <th className="border border-gray-700 p-3">Flight Number</th>
                    <th className="border border-gray-700 p-3">Departure</th>
                    <th className="border border-gray-700 p-3">Arrival</th>
                    <th className="border border-gray-700 p-3">Departure Time</th>
                    <th className="border border-gray-700 p-3">Fligt Date</th>
                    <th className="border border-gray-700 p-3">Travel Class</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(booking => (
                    <tr key={booking.booking_id}>
                        <td className="border border-gray-700 p-2">{booking.booking_id}</td>
                        <td className="border border-gray-700 p-2">{booking.flightnumber}</td>
                        <td className="border border-gray-700 p-2">{cities.find(city => city.city_id === booking.departurecity)?.city}</td>
                        <td className="border border-gray-700 p-2">{cities.find(city => city.city_id === booking.arrivalcity)?.city}</td>
                        <td className="border border-gray-700 p-2">{booking.departuretime}</td>
                        <td className="border border-gray-700 p-2">{setFlightDate(booking)}</td>
                        <td className="border border-gray-700 p-2">{booking.travelclass}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
 }
export default ShowBooking;