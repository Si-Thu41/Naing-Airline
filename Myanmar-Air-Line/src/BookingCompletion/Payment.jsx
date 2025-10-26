import { useNavigate } from "react-router";
function Payment() {
    const navigate = useNavigate();
    async function handlePayment(){
        // Implement payment processing logic here
        await fetch(`http://localhost:3000/api/bookFlight`,{
            method: 'POST',
            credentials: 'include',
        });
        navigate('/');
    }
    return <div>Payment Page
        <button onClick={handlePayment}>Confirm Payment</button>
    </div>;
}
export default Payment;