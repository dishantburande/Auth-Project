import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const SECRET_KEY = 'd5db26ad72217185d796ed0b1f69020a4f674d0979308577c2803386cfc9808b' // Use environment variables in production;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dishant.burande@gmail.com",
    pass: "vuahxqnsrjsftodw",
  },
});

// Genrate OTP

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Register User and Send OTP

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await user.save();

    await transporter.sendMail({
      from: "dishant.burande@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OPT is : ${otp}`,
    });

    res
      .status(201)
      .json({
        message: " User Register. Please verify OTP  send to your email",
      });
  } catch (error) {
    res.status(500).json({ message: " Error while registering User", error });
  }
};

export const verifyOPT = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not Found" });

    if (user.isVerified)
      return res.status(400).json({ message: " User already Verified" });

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: " Email Verified Successfully. You can now log In" });
  } catch (error) {
    res.status(500).json({ message: "Error while Verifying OTP, error" });
  }
};

// Rsend OTP


export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not Found" });
    if (user.isVerified) return res.status(400).json({ message: "User already Verified" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: "dishant.burande@gmail.com",
      to: email,
      subject: "Resend OTP Verification",
      text: `Your new OTP is: ${otp}`,
    });

    // IMPORTANT: send a response
    return res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("resendOTP error:", error);
    return res.status(500).json({ message: "Error resending OTP", error });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Email not verified. Please verify OTP." });
    }

    //  Hardcoded Secret Key
    const SECRET_KEY =
      "d5db26ad72217185d796ed0b1f69020a4f674d0979308577c2803386cfc9808b";

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    //  Return token in JSON response too
    res.json({
      message: "Login successful",
      token, // Send token in response body
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token"); // Remove the JWT cookie
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};

// Dashboard (Protected Route)
export const dashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Welcome to the dashboard",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard", error });
  }
};
