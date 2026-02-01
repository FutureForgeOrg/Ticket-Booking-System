import BaseUser from "../models/BaseUser.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";

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

        //validation
        if (password.length < 4) {
            return res.status(400).json({ message: "Password must be at least 4 characters long" });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: "Phone number must be 10 digits long" });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                message: "Invalid email address"
            });
        }


        //check if user already exists
        const existingUser = await BaseUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const newUser = new BaseUser({
            name,
            email,
            password: hashedPassword,
            phone,
            gender,
            location: {
                city,
                state,
            }
        })

        if (newUser) {

            await newUser.save();
            //generate token and set cookie
            generateToken(newUser, res);

            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,   
                }
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }



    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });


    }
}

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

        const isMatch = await bcrypt.compare(password, user.password);



        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        generateToken(user, res);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,

            }
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
        console.log("Fetching user data for user ID:", req.user);
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