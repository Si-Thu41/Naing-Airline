import BookingPDF from "./BookingPDF";
import {useLocation} from 'react-router-dom';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function BookingComplete(){
    const location=useLocation();
    const {bookingDetail, formData}=location.state;
    return <div className="min-h-screen flex flex-col">
    <Header renderHeaderLinks={false}/>
      <div className="text-center mt-20 flex-grow">
        <h1 className="text-3xl font-bold mb-4">Booking Complete!</h1>
        <p className="text-lg">Thank you for booking with NAING Online Tickets. We wish you a pleasant flight!</p>
        <BookingPDF bookingDetail={bookingDetail} formData={formData} />
    </div>
    <Footer/>
    </div>
  
}
export default BookingComplete;