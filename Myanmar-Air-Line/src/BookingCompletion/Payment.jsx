import { useNavigate } from "react-router";
function Payment() {
    const navigate = useNavigate();
    async function handlePayment(){
        // Implement payment processing logic here
        await fetch(`http://localhost:3000/api/bookFlight`,{
            method: 'POST',
            credentials: 'include',
        });
        navigate('/bookingComplete');
    }
    return <div>Payment Page
        <button className="bg-blue-600 rounded" onClick={handlePayment}>Confirm Payment</button>
    </div>;
}
export default Payment;