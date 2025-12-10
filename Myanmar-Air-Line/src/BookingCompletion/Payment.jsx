import { useNavigate } from "react-router";
import { API_BASE_URL } from "../Functions/backendurl.js";

function Payment() {
    const navigate = useNavigate();
    async function handlePayment(){
        // Implement payment processing logic here
        await fetch(`${API_BASE_URL}/bookFlight`,{
            method: 'POST',
            credentials: 'include',
        });
        navigate('/bookingComplete');
    }
    return <div><h1>Payment Page</h1>
        <button className="bg-blue-600 rounded" onClick={handlePayment}>Confirm Payment</button>
    </div>;
}
export default Payment;