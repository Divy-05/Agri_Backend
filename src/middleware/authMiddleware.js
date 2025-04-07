import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import Admin from "../model/adminModel.js";

const protect = async (req, res, next) => {
    try {
        // console.log("Headers:", req.headers); // Debugging log

        let token = req.headers.authorization;
        if (!token) {
            // console.log("No token found in headers!");
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        // Handle both "Bearer TOKEN" and "TOKEN" formats
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // Extract actual token
        }

        // console.log("Extracted Token:", token); // Debugging log

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token Data:", decoded); // Debugging log

        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            // console.log("User not found in database!");
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        // console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

const adminProtect = async (req, res, next) => {
        try {
            // console.log("Headers:", req.headers); // Debugging log
    
            let token = req.headers.authorization;
            if (!token) {
                // console.log("No token found in headers!");
                return res.status(401).json({ message: "Not authorized, no token" });
            }
    
            // Handle both "Bearer TOKEN" and "TOKEN" formats
            if (token.startsWith("Bearer ")) {
                token = token.split(" ")[1]; // Extract actual token
            }
    
            // console.log("Extracted Token:", token); // Debugging log
    
            const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
            // console.log("Decoded Token Data:", decoded); // Debugging log
    
            req.user = await Admin.findById(decoded.id).select("-password");
            if (!req.user) {
                // console.log("Admin not found in database!");
                return res.status(401).json({ message: "Admin not found" });
            }
    
            next();
        } catch (error) {
            // console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ message: "Not authorized, invalid token" });
        }
    };
    

export { 
    protect, 
    adminProtect 
};