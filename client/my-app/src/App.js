import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// import { useNavigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";



const App = () => {
 // const navigate = useNavigate();



  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
    </Routes>);
};

export default App;