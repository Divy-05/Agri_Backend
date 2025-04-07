import express from "express";
import {
    adminSignup,
    adminSignin,
    updateAdmin,
    getProfile,
    deleteUser,
    getAllUsers,
    getUserById
} from "../controller/adminController.js";
import { adminProtect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/signin", adminSignin);
router.put("/update", adminProtect, updateAdmin);
router.get("/profile", adminProtect, getProfile);
router.delete("/delete/:id", adminProtect, deleteUser);
router.get("/allusers", adminProtect, getAllUsers);
router.get("/user/:id", adminProtect, getUserById)

export default router;