// import User from "../model/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// // Generate JWT Token
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // Signup Controller
// const signup = async (req, res) => {
//     try {
//         const { name, email, password, role, contact_number, address } = req.body;
//         const photo = req.file ? req.file.path : null; // Store uploaded file path

//         // Email regex validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({ message: "Invalid email format" });
//         }

//         // Contact number regex validation (Allows 10-digit numbers)
//         const contactRegex = /^[6-9]\d{9}$/;
//         if (!contactRegex.test(contact_number)) {
//             return res.status(400).json({ message: "Invalid contact number format" });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: "User already exists" });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             role,
//             contact_number,
//             address,
//             photo
//         });

//         res.status(201).json({
//             message: "User registered successfully",
//             user
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // const signup = async (req, res) => {
// //     try {
// //         const { name, email, password, role, contact_number, address } = req.body;
// //         const photo = req.file ? req.file.path : null; // Store uploaded file path

// //         // Check if required fields are present
// //         if (!name || !email || !password || !role || !contact_number || !address) {
// //             return res.status(400).json({ message: "All fields are required" });
// //         }

// //         // Email regex validation
// //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         if (!emailRegex.test(email)) {
// //             return res.status(400).json({ message: "Invalid email format" });
// //         }

// //         // Contact number regex validation (Allows 10-digit numbers)
// //         const contactRegex = /^[6-9]\d{9}$/;
// //         if (!contactRegex.test(contact_number)) {
// //             return res.status(400).json({ message: "Invalid contact number format" });
// //         }

// //         // Check if user already exists
// //         const existingUser = await User.findOne({ email });
// //         if (existingUser) return res.status(400).json({ message: "User already exists" });

// //         // Ensure password is a valid string
// //         if (typeof password !== "string") {
// //             return res.status(400).json({ message: "Invalid password format" });
// //         }

// //         // Hash password
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Create new user
// //         const user = await User.create({
// //             name,
// //             email,
// //             password: hashedPassword,
// //             role,
// //             contact_number,
// //             address,
// //             photo
// //         });

// //         res.status(201).json({
// //             message: "User registered successfully",
// //             user
// //         });
// //     } catch (error) {
// //         console.error("Signup Error:", error.message);
// //         res.status(500).json({ message: error.message });
// //     }
// // };


// // Signin Controller
// const signin = async (req, res) => {
//     try {
//         const { email, contact_number, password } = req.body;

//         // Check if email or contact number is provided
//         if (!email && !contact_number) {
//             return res.status(400).json({ message: "Email or contact number is required" });
//         }

//         // Find user by email or contact number
//         const user = await User.findOne({
//             $or: [{ email: email }, { contact_number: contact_number }]
//         });

//         if (!user) return res.status(400).json({ message: "Invalid credentials" });

//         // Validate password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

//         res.status(200).json({
//             message: "Login successful",
//             token: generateToken(user._id),
//             user
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update Profile Controller (with Photo Upload)
// const updateProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const { name, contact_number, address } = req.body;
//         const photo = req.file ? req.file.path : user.photo; // Update photo if uploaded

//         user.name = name || user.name;
//         user.contact_number = contact_number || user.contact_number;
//         user.address = address || user.address;
//         user.photo = photo;

//         const updatedUser = await user.save();

//         res.status(200).json({
//             message: "Profile updated successfully",
//             user: updatedUser
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get Profile Controller (Protected Route)
// const getProfile = async (req, res) => {
//     try {
//         if (!req.user) return res.status(401).json({ message: "Not authorized" });

//         res.status(200).json(req.user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// // Change Password Controller (Protected Route)
// const changePassword = async (req, res) => {
//     try {
//         const { oldPassword, newPassword } = req.body;

//         // Find user by ID
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // Compare old password
//         const isMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

//         // Hash new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;

//         // Save user with new password
//         await user.save();

//         res.status(200).json({ message: "Password changed successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const forgetPassword = async (req, res) => {
//     try {
//         const { email, contact_number } = req.body;

//         // Check if at least one field is provided
//         if (!email && !contact_number) {
//             return res.status(400).json({ message: "Please provide an email or contact number" });
//         }

//         // Find user by email or contact number
//         const user = await User.findOne({
//             $or: [{ email }, { contact_number }]
//         });

//         if (!user) return res.status(404).json({ message: "User not found" });

//         // Generate a JWT token with short expiry (e.g., 10 minutes)
//         const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "10m"
//         });

//         res.status(200).json({ message: "Reset token generated", resetToken });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// const resetPassword = async (req, res) => {
//     try {
//         const { token, newPassword } = req.body;

//         // Check if token and password are provided
//         if (!token || !newPassword) {
//             return res.status(400).json({ message: "Token and new password are required" });
//         }

//         // Verify JWT token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         if (!user) return res.status(404).json({ message: "Invalid token or user not found" });

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;

//         await user.save();

//         res.status(200).json({ message: "Password reset successful" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

  
// export {
//   signup,
//   signin,
//   getProfile,
//   updateProfile,
//   changePassword,
//   forgetPassword,
//   resetPassword
// }

import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password, role, contact_number, address } = req.body;
        const photo = req.file ? req.file.path : null;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const contactRegex = /^[6-9]\d{9}$/;
        if (!contactRegex.test(contact_number)) {
            return res.status(400).json({ message: "Invalid contact number format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            contact_number,
            address,
            photo
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Signin Controller (returns user only)
const signin = async (req, res) => {
    try {
        const { email, contact_number, password } = req.body;

        if (!email && !contact_number) {
            return res.status(400).json({ message: "Email or contact number is required" });
        }

        const user = await User.findOne({
            $or: [{ email }, { contact_number }]
        });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Profile (requires ID from frontend)
const updateProfile = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { name, contact_number, address } = req.body;
        const photo = req.file ? req.file.path : user.photo;

        user.name = name || user.name;
        user.contact_number = contact_number || user.contact_number;
        user.address = address || user.address;
        user.photo = photo;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Profile (requires ID from frontend)
const getProfile = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Change Password (requires ID from frontend)
const changePassword = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forget Password (returns dummy confirmation)
const forgetPassword = async (req, res) => {
    try {
        const { email, contact_number } = req.body;

        if (!email && !contact_number) {
            return res.status(400).json({ message: "Please provide an email or contact number" });
        }

        const user = await User.findOne({ $or: [{ email }, { contact_number }] });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User identity confirmed. Proceed with reset manually." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reset Password (requires ID from frontend)
const resetPassword = async (req, res) => {
    try {
        const { id, newPassword } = req.body;

        if (!id || !newPassword) {
            return res.status(400).json({ message: "User ID and new password are required" });
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    signup,
    signin,
    getProfile,
    updateProfile,
    changePassword,
    forgetPassword,
    resetPassword
};

