import BookingPDF from "../components/BookingPDF.jsx";
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function BookingComplete(){
  const navigate = useNavigate();
    return <div className="min-h-screen flex flex-col">
    <Header renderHeaderLinks={false}/>
      <div className="text-center mt-20 flex-grow">
        <h1 className="text-3xl font-bold mb-4">Booking Complete!</h1>
        <p className="text-lg">Thank you for booking with NAING Online Tickets. We wish you a pleasant flight!</p>
        <button className="mt-6 bg-orange-600 text-white px-4 py-2 rounded-[5px] hover:bg-orange-700" onClick={() => navigate('/')}>Return to Home Page</button>
        
    </div>
    <Footer/>
    </div>
  
}
export default BookingComplete;