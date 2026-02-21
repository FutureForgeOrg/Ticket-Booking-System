import BaseUser from "../models/BaseUser.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";
import Otp from "../models/Otp.js";
import transporter from "../config/mail.js";
export const register = async (req, res) => {

    const {
        name,
        email,
        password,
        phone,
        city,
        state,
        gender
    } = req.body;

    try {

        if (!name || !email || !password || !phone || !city || !state || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 4) {
            return res.status(400).json({ message: "Password must be at least 4 characters long" });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: "Phone number must be 10 digits long" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        const existingUser = await BaseUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //  Save user first
        const newUser = await BaseUser.create({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            isVerified: false,
            location: { city, state }
        });

        //  Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({
            userId: newUser._id,
            otp: otpCode,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });

        //  Send Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Account",
            html: `
                <h2>Your OTP: ${otpCode}</h2>
                <p>This OTP will expire in 15 minutes.</p>
            `
        });

        const userToSend = newUser.toObject();
        delete userToSend.password;

        return res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify OTP.",
            user: userToSend
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {

        const user = await BaseUser.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        const otpRecord = await Otp.findOne({ userId: user._id });

        if (!otpRecord) {
            await BaseUser.deleteOne({ _id: user._id });
            return res.status(400).json({
                message: "OTP expired. Please signup again."
            });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.isVerified = true;
        await user.save();

        await Otp.deleteOne({ _id: otpRecord._id });

        generateToken(user, res);

        const userToSend = user.toObject();
        delete userToSend.password;

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: userToSend
        });

    } catch (error) {
           console.error("Verify OTP Error:", error);  
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await BaseUser.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already verified"
            });
        }

        //  OPTIONAL: Cooldown (60 sec)
        const existingOtp = await Otp.findOne({ userId: user._id });

        if (existingOtp) {
            const timeDiff = Date.now() - existingOtp.createdAt.getTime();
            const seconds = Math.floor(timeDiff / 1000);

            if (seconds < 60) {
                return res.status(400).json({
                    success: false,
                    message: `Please wait ${60 - seconds}s before requesting new OTP`
                });
            }

            await Otp.deleteOne({ _id: existingOtp._id });
        }

        // Generate new OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.create({
            userId: user._id,
            otp: newOtp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });

        // Send Email
        await transporter.sendMail({
            from: `"Your App Name" <${process.env.EMAIL}>`,
            to: user.email,
            subject: "Resend Verification Code",
            text: `Your new OTP is ${newOtp}`,
            html: `
                <div style="font-family: Arial; padding: 20px;">
                    <h2>Resend Verification Code</h2>
                    <p>Your new OTP is:</p>
                    <h1 style="letter-spacing: 5px;">${newOtp}</h1>
                    <p>This code expires in 5 minutes.</p>
                </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully"
        });

    } catch (error) {
        console.error("Resend OTP Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const createAdmin = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            city,
            state,
            gender
        } = req.body;

        //  Check required fields
        if (!name || !email || !password || !phone || !city || !state || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //  Check if email already exists
        const existingUser = await BaseUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create new admin
        const newAdmin = await BaseUser.create({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            location: {
                city,
                state
            },
            role: "admin",
            isVerified: true
        });

        const adminData = newAdmin.toObject();
        delete adminData.password;

        res.status(201).json({
            success: true,
            message: "New admin created successfully",
            admin: adminData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Invalid email address"
            });
        }

        const user = await BaseUser.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in" });
        }

        const isMatch = await bcrypt.compare(password, user.password);



        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateToken(user, res);

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            message: "Login successful",
            user: userData
        });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Invalid email address"
            });
        }

        const user = await BaseUser.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);



        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateToken(user, res);

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            message: "Login successful",
            user: userData
        });

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await BaseUser.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            data: user
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};