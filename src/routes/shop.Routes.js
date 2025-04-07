import express from 'express';
import { 
    createShopItem, 
    getShopItems, 
    getShopItemById, 
    updateShopItem, 
    deleteShopItem 
} from '../controller/shopController.js';
import { upload } from '../middleware/shopMiddleware.js';
import { adminProtect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post('/create', upload.single('photo'),adminProtect, createShopItem);
router.get('/getall', adminProtect, getShopItems);
router.get('/getItem/:id', adminProtect, getShopItemById);
router.put('/updateItem/:id', upload.single('photo'),  adminProtect, updateShopItem);
router.delete('/delete/:id', adminProtect, deleteShopItem);

export default router;