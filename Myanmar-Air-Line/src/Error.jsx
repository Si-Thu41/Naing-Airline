import "./error.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

function ErrorPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const errorInfo = location.state || {};
    console.error("Error Page Info:", errorInfo);
    const handleNavigation = () => {
        navigate("/");
    };

    return(
        <div id="notfound">
            <div className="notfound">
                <div className="notfound404">
                    <h1>{errorInfo.status}</h1>
                    <h2>{errorInfo.error || "Page not found"}</h2>
                </div>
                <a onClick={handleNavigation} className="cursor-pointer">Homepage</a>
            </div>
        </div>
    );
}
export default ErrorPage;