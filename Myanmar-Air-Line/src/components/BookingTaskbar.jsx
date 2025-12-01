import SearchFlight from "./SearchFlight";
import ShowBooking from "../Traveler/ShowBooking";
import { useState } from "react";
import FlightStatus from "./FlightStatus";

function BookingTaskbar(props) {
  const elements = props;
  const [activeIndex, setActiveIndex] = useState(0);

  function handleClick(index) {
    setActiveIndex(index);
  }

  return <div className="text-center mt-[-10px] ">
    {Object.values(elements).map((element, index) => (
      <button key={index} className={` text-orange-700 xl:py-[10px] xl:px-[35px] xl:text-2xl lg:py-[8px] lg:px-[20px] lg:text-lg md:py-[6px] md:px-[12px] md:text-base z-20 relative  text-[12px] py-[5px] px-[5px] cursor-pointer${activeIndex === index ? " bg-orange-600 text-white" : " bg-slate-300 hover:text-white hover:bg-orange-500"} ${index===0 ? " rounded-l-3xl" : ""} ${index===Object.values(elements).length-1 ? " rounded-r-3xl" : ""}`} onClick={() => handleClick(index)}>
        {element}
      </button>

    ))}
          {/* render the selected panel */}
      <div className="mt-4">
        {[
          <SearchFlight key="search" />,
          <ShowBooking key="show" />,
          <FlightStatus key="status" />
        ][activeIndex]}
      </div>
  </div>;
}


export default BookingTaskbar;