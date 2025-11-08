import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {

  
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "login_required") {
      setError("You must be logged in to access the dashboard.");
    }
  }, [location.search]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      { email, password },
      { withCredentials: true } // accept httpOnly cookie set by server
    );

    // Save token in localStorage (your backend also sets cookie)
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    setLoading(false);
    navigate("/dashboard");
  } catch (err) {
    setLoading(false);
    if (err.response?.data?.message) {
      setError(err.response.data.message);
      if (err.response.data.message === "Email not verified. Please verify OTP.") {
        // Open OTP modal for verification
        setIsOtpModalOpen(true);
      }
    } else {
      setError("An error occurred. Please try again.");
    }
  }
};

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setOtpError("");
    setOtpSuccess("");

    try {
      await axios.post("http://localhost:8000/api/auth/resend-otp", { email });
      setOtpSuccess("OTP has been resent to your email.");
      setResendCooldown(60);
    } catch (err) {
      setOtpError("Failed to resend OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    setOtpSuccess("");

    try {
      await axios.post("http://localhost:8000/api/auth/verify-otp", {
        email,
        otp,
      });
      setOtpSuccess("Email verified successfully! Please log in.");
      setTimeout(() => setIsOtpModalOpen(false), 1000);
    } catch (err) {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="container center-container">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Login</h2>{" "}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>{" "}
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>{" "}
          <div className="mb-3">
            <label className="form-label">Password</label>{" "}
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>{" "}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>{" "}
        </form>{" "}
        <div className="mt-3 text-center">
          <p>
            Don't have an account? <a href="/register">Register here</a>
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {isOtpModalOpen && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Verify OTP</h5>{" "}
                <button
                  className="btn-close"
                  onClick={() => setIsOtpModalOpen(false)}
                ></button>{" "}
              </div>{" "}
              <div className="modal-body">
                {otpSuccess && (
                  <div className="alert alert-success">{otpSuccess}</div>
                )}
                {otpError && (
                  <div className="alert alert-danger">{otpError}</div>
                )}
                <div className="mb-3">
                  <label className="form-label">Enter OTP</label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>{" "}
              </div>{" "}
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleVerifyOtp}>
                  Validate OTP
                </button>{" "}
                <button
                  className="btn btn-secondary"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend OTP"}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default Login;
