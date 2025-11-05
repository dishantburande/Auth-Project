

import { useEffect,useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/auth/dashboard',
                    { withCredentials: true }
                );
                console.log('API Response:', response.data); // Log response to check the structure

                if (response.data && response.data.user) {
                    setUserData(response.data.user); // Set the full user object in state
                } else {
                    throw new Error('No user data found');
                }
            } catch (err) {
                setError('You Must Be Login to Access the Dashboard. Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
            }
        };

        fetchUserData();
    }, [navigate]);


  const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
            navigate('/login'); // Redirect to login after logout
        } catch (err) {
            setError('Logout failed. Please try again.');
        }
    };

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>);
    }


     return (
        <div className="container mt-4">
            <h2>Welcome to Your Dashboard</h2>     {userData ? (
                <div>
                    <p>
                        <strong>Name:</strong> {userData.name}
                    </p>          <p>
                        <strong>Email:</strong> {userData.email}
                    </p>         <p>
                        <strong>Id:</strong> {userData._id}
                    </p>         <p>
                        <strong>Is Verified:</strong> {userData.isVerified ? "Yes" : "No"}
                    </p>         <button onClick={handleLogout} className="btn btn-danger">
                        Logout        </button>        </div>) : (
                <p>Loading...</p>)}
        </div>);
};

export default Dashboard;