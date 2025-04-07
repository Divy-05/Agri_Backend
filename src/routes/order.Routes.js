import express from "express";
import { 
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controller/orderController.js";

import { protect }  from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/getall", protect, getOrders);
router.get("/get/:id", protect, getOrderById);
router.put("/update/:id", protect, updateOrder);
router.delete("/delete/:id", protect, deleteOrder);


export default router;