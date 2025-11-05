import axios from 'axios'

const API_BASE_URL = "http://localhost:8000/api/auth"; // Backend base URL

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};


// Resend OTP
export const resendOtp = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/resend-otp`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to resend OTP";
    }
};     

// Verify OTP
export const verifyOtp = async (email, otp) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/verify-otp`,
            { email, otp },
            { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Invalid OTP";
    }
};
        
// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, userData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

// Logout User
export const logoutUser = async () => {
    try {
        await axios.post(`${API_BASE_URL}/logout`);
    } catch (error) {
        console.error("Logout failed", error);
    }
};

// Fetch Dashboard Data (Protected Route)
export const fetchDashboard = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard`, {
            withCredentials: true, // Include session cookies
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch dashboard data";
    }
};

