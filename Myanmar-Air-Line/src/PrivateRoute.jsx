import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null);
    React.useEffect(() => {
    try{fetch("http://localhost:3000/checkAuth", {
        method: "GET",
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        if (data.isLoggedIn) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    })}catch(error){
        console.log("Error in PrivateRoute:",error);
        setIsAuthenticated(false);
    }
}, []);
    if (isAuthenticated === null) {
        return null; // or a loading spinner
    }
    return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;