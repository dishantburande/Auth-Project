import { useEffect } from "react";

import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ element }) => {
    const navigate = useNavigate();

     useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect to login if no token is found
        }
    }, [navigate]);

    // Render the protected component only if token exists
    const token = localStorage.getItem("token");
    return token ? element : null;
};

export default PrivateRoute;