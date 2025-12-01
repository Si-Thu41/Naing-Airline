import { useLocation,useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import cities from "./cities.js";

function City() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cityName } = location.state || { cityName: "Unknown Destination" };
    return (
        <div className="flex flex-col min-h-screen">
            <Header renderHeaderLinks={false} />
            <main className="flex-grow p-4 ">
                <div className="my-3">
                    <img src={`${cityName}.jpg`} alt={cityName} className="rounded-2xl w-[50%] m-auto h-90 object-cover" />
                </div>
                <p className="text-3xl">{cityName}</p>
                <p  className="mx-20 my-5 text-lg">{cities.find(city => city.name === cityName)?.description}</p>      
                <div className="text-center mt-10">
                    <button className="bg-orange-600 p-3 text-white rounded-md cursor-pointer hover:bg-orange-700" onClick={()=>navigate('/')}>Home Page</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default City;