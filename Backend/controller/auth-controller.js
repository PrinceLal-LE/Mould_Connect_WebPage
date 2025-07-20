const userModel = require('../models/users-model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const home = async (req, res) => {
    try {
        res.status(200).send("User Authenticated Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

// Function to generate a JWT
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRATION_TIME } // '1h' from .env
    );
};

// Register route handler
const register = async (req, res) => {
    try {
        // Getting value form the registration form. 
        const { username, email, name, password, mobile } = req.body;

        // Santize and validate all input field.
        if (!username || !email || !name || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if username, email, or mobile already exist
        const existingUser = await userModel.findOne({ $or: [{ username: username }, { email: email }, { mobile: Number(mobile) }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username already exists" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: "User Email already exists" });
            }
            if (existingUser.mobile === mobile) {
                return res.status(400).json({ message: "Mobile number already exists" });
            }
        }

        // Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // Check if the username is valid
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/; // Alphanumeric and underscores, 3-30 characters
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Username must be 3-30 characters long and can only contain letters, numbers, and underscores" });
        }
        // Check if the name is valid
        const nameRegex = /^[a-zA-Z\s]{2,50}$/; // Letters and spaces, 2-50 characters
        if (!nameRegex.test(name)) {
            return res.status(400).json({ message: "Name must be 2-50 characters long and can only contain letters and spaces" });
        }
        // Check if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/; // At least one lowercase, one uppercase, one digit, and at least 10 characters
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one digit" });
        }
        // Check if the mobile number is valid
        const mobileRegex = /^\d{10}$/; // Exactly 10 digits
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
        }

        // Create a new user
        const newUser = new userModel({
            username: username,
            email: email,
            name: name,
            password: password,
            mobile: mobile,
            updatedAt: Date.now(),
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT for the newly registered user
        const token = generateToken(newUser);

        res.status(201).json({
            message: "User successfully registered.",
            token: token,
            user: {
                name: newUser.name,
                email: newUser.email,
            },
        })
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Extract validation messages
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation failed", errors: messages });
        }
        // Handle Mongoose casting errors (e.g., trying to save a string into a Number field)
        else if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: `Invalid data type for field: ${error.path}. Expected a ${error.kind}, but received ${error.value}.` });
        }
        console.error("Error during registration:", error); // Log the full error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Login route handler
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await userModel.findOne({ email: email }).select('+password');;
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" }); // Use a generic message for security
        }

        // Compare the provided password with the hashed password in the database
        // Assuming you have a comparePassword method on your userModel schema
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // If credentials are correct, send a success response
        // In a real application, you would generate a JWT here
        const token = generateToken(user);
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    home,
    register,
    login
};