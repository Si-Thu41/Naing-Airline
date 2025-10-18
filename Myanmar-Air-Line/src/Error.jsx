
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function ErrorPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const errorInfo = location.state || {};
    const handleNavigation = () => {
        navigate("/");
    };

    return(
        <div className="flex flex-col min-h-screen" >
            <Header />
            <main className="flex-1 flex flex-col justify-center items-center ">
                <h1 className="font-bold text-3xl">Error {errorInfo.error.status || 404}</h1>
                <p>{errorInfo.error.errorMessage || "Page not found"}</p>
                <button onClick={handleNavigation} className="bg-blue-500 p-2 rounded-md text-white cursor-pointer hover:bg-blue-400" >Go to Homepage</button>
            </main>
            <Footer />
        </div>
    );
}
export default ErrorPage;