import express from "express";
import { 
    signup,
    signin,
    getProfile,
    updateProfile,
    changePassword,
    forgetPassword,
    resetPassword 
} from "../controller/userController.js";
import { 
    getShopItems, 
    getShopItemById, 
} from '../controller/shopController.js';
import { protect }  from "../middleware/authMiddleware.js"; 
import {upload} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/signup", upload.single('photo'), signup);
router.post("/signin", signin);
router.get("/profile", protect, getProfile);
router.put("/update-profile", upload.single('photo'), protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

router.get("/shop/getall", protect, getShopItems);
router.get("/shop/getItem/:id", protect, getShopItemById);

export default router;

// import express from "express";
// import {
//   signup,
//   signin,
//   getProfile,
//   updateProfile,
//   changePassword,
//   forgetPassword,
//   resetPassword
// } from "../controller/userController.js";
// import {
//   getShopItems,
//   getShopItemById
// } from "../controller/shopController.js";
// import { upload } from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// // User Auth & Profile Routes
// router.post("/signup", upload.single("photo"), signup);
// router.post("/signin", signin);

// // These routes now depend on 'id' sent in req.body
// router.get("/profile/:id", getProfile);
// router.put("/update-profile", upload.single("photo"), updateProfile);
// router.put("/change-password", changePassword);
// router.post("/forget-password", forgetPassword);
// router.post("/reset-password", resetPassword);

// router.get("/shop/getall", getShopItems);
// router.get("/shop/getItem/:id", getShopItemById);

// export default router;


