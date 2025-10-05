function FlightDetail({flightDetail, close, show, departureCity, arrivalCity}) {
  if (!show) {return null;}else{
    const tempDepartureDate = new Date(flightDetail.flightdate);
    flightDetail.flightdate = `${tempDepartureDate.getFullYear()}-${String(tempDepartureDate.getMonth() + 1).padStart(2, '0')}-${String(tempDepartureDate.getDate()).padStart(2, '0')}`;
    const tempArrivalDate = new Date(flightDetail.arrivaldate);
    flightDetail.arrivaldate = `${tempArrivalDate.getFullYear()}-${String(tempArrivalDate.getMonth() + 1).padStart(2, '0')}-${String(tempArrivalDate.getDate()).padStart(2, '0')}`;
    const departure=new Date(`${flightDetail.flightdate}T${flightDetail.departuretime}`);
    const arrival=new Date(`${flightDetail.arrivaldate}T${flightDetail.arrivaltime}`);

    // Calculate duration in milliseconds
    const durationMs = arrival - departure;
    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthString = months[departure.getMonth()];
    const dayOfWeekString = days[departure.getDay()];
    const year = departure.getFullYear();
  return (
    <div className="absolute flex flex-col top-[30%] left-[50%] -translate-[50%] w-[50%] h-[50%] rounded-lg bg-white shadow-2xl shadow-black z-10 p-8 overflow-auto ">
        <div className="flex-1"><h1 className="text-2xl font-bold text-orange-700">Flight Details</h1>
        <div className="my-4">
           <p className="text-black font-bold">{departureCity.toUpperCase()} - {arrivalCity.toUpperCase()}</p>
        </div>
        <hr></hr>
        <h2 className="text-gray-600 font-semibold mt-3">Your flight departs on <span className="text-black font-bold">{dayOfWeekString}, {departure.getDate()} {monthString} {year}</span></h2>
        <p className="text-gray-600 font-semibold">Total Duration: <span className="text-black font-bold">{hours}h {minutes}m</span></p>
        <p className="text-gray-600 font-semibold">Flight Number: <span className="text-black font-bold">{flightDetail.flightnumber}</span></p>
        <p className="text-gray-600 font-semibold">Departure: <span className="text-black font-bold">{flightDetail.departuretime}</span></p>
        <p className="text-gray-600 font-semibold">Arrival: <span className="text-black font-bold">{flightDetail.arrivaltime}</span></p>

        </div>
        <div className="w-full grid justify-items-end"><button onClick={close} className="max-w-max cursor-pointer bg-red-400 text-white px-4 py-2 rounded">Close</button></div>
    </div>
  )
}}

export default FlightDetail;