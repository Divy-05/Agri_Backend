import Admin from "../model/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ADMIN_SECRET, { expiresIn: "30d" });
};

// Signup Controller
const adminSignup = async (req, res) => {
    try {
        const { name, email, password, contact_number } = req.body;

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Contact number regex validation (Allows 10-digit numbers)
        const contactRegex = /^[6-9]\d{9}$/;
        if (!contactRegex.test(contact_number)) {
            return res.status(400).json({ message: "Invalid contact number format" });
        }

        // Check if user already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Admin already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await Admin.create({
            name,
            email,
            password: hashedPassword,
            contact_number,
        });

        res.status(201).json({
            message: "Admin registered successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 

// Signin Controller
const adminSignin = async (req, res) => {
    try {
        const { email, contact_number, password } = req.body;

        // Check if email or contact number is provided
        if (!email && !contact_number) {
            return res.status(400).json({ message: "Email or contact number is required" });
        }

        // Find user by email or contact number
        const user = await Admin.findOne({
            $or: [{ email: email }, { contact_number: contact_number }]
        });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id),
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const user = await Admin.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { name, contact_number } = req.body;

        user.name = name || user.name;
        user.contact_number = contact_number || user.contact_number;

        const updatedUser = await user.save();

        res.status(200).json({
            message: "Admin updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Not authorized" });

        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User is not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting User', error: error.message });
    }
};



const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (!users || users.lenfth === 0) {
            return res.status(404).json({message: "No users found"})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export {
    adminSignup,
    adminSignin,
    updateAdmin,
    getProfile,
    deleteUser,
    getAllUsers,
    getUserById
}