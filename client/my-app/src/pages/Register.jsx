import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { registerUser, verifyOtp, resendOtp } from "../api/auth.js";
import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const [resendCooldown, setResendCooldown] = useState(0); // State for countdown
  const navigate = useNavigate();

  // Handle countdown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Clear the timer on unmount
  }, [resendCooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); // Set loading to true when register starts

    try {
      await registerUser(formData);
      setMessage(
        "Registration successful! An OTP has been sent to your email."
      );

      // Open the modal after 10 seconds
      setTimeout(() => setIsOtpModalOpen(true), 10000);
    } catch (err) {
      setError(err || "Registration failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after registration attempt
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    setOtpSuccess("");

    try {
      await verifyOtp(formData.email, otp);
      setOtpSuccess("Email verified! Now you can log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setOtpError(err || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setOtpSuccess("");

    try {
      await resendOtp(formData.email);
      setOtpSuccess("OTP has been resent to your email.");
      setResendCooldown(60); // Start the 60 seconds countdown
    } catch (err) {
      setOtpError(err || "Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="container center-container">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Register</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>{" "}
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>{" "}
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>{" "}
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>{" "}
              </div>
            ) : (
              "Register"
            )}
          </button>{" "}
        </form>
        <div className="mt-3 text-center">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>{" "}
        </div>{" "}
      </div>
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
                <label className="form-label">Enter OTP</label>{" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>{" "}
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleVerifyOtp}>
                  ValidateOTP{" "}
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

export default Register;
