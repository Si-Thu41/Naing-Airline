import React from "react";
import { Navigate } from "react-router-dom";
import {Blocks} from "react-loader-spinner";

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
            console.log("User is authenticated");
            setIsAuthenticated(true);
        } else {
            console.log("User is not authenticated");
            setIsAuthenticated(false);
        }
    })}catch(error){
        console.log("Error in PrivateRoute:",error);
        setIsAuthenticated(false);
    }
}, []);
    if (isAuthenticated === null) {
        return <div className="flex justify-center items-center h-screen">
            <Blocks
  height="80"
  width="80"
  color="#e27012ff"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  visible={true}
  />;
        </div>
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;