import userModel from "../models/usersModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Compare provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Password is incorrect" });
        }
    } catch (error) {
        console.error('Login Error:', error); // Log the full error object for debugging
        return res.json({ 
            success: false, 
            message: error.message || "An unexpected error occurred" // Fallback message if error.message is undefined
        });
    }
};

// Route for user signup
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate the email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate the password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a stronger password (minimum 8 characters)" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPswd = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPswd,
        });
        const user = await newUser.save();

        // Generate and return the JWT token
        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        

        // Compare the provided credentials with the environment variables
        if (email.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase() && password.trim().toLowerCase() === process.env.ADMIN_PASSWORD.trim().toLowerCase()) {
            const token = jwt.sign(email+password , process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export { loginUser, signupUser, adminLogin };
