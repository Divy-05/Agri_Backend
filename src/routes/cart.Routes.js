import express from "express";
import { 
    addToCart, removeFromCart, displayCart} from "../controller/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.delete("/remove/:productId/:quantityToRemove", protect, removeFromCart);
router.get("/display", protect, displayCart);

export default router;