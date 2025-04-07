import Shop from '../model/shopModel.js';

// Create a new shop item
const createShopItem = async (req, res) => {
    try {
        const { name, category, description, price, stock, color, size } = req.body;
        const photo = req.file ? req.file.filename : '';

        const newShopItem = new Shop({
            name,
            category,
            description,
            price,
            stock,
            size,
            color,
            photo,
        });

        await newShopItem.save();
        res.status(201).json({ message: 'Shop item created successfully', newShopItem });
    } catch (error) {
        res.status(500).json({ message: 'Error creating shop item', error: error.message });
    }
};

// Get all shop items
const getShopItems = async (req, res) => {
    try {
        const shopItems = await Shop.find();
        res.status(200).json(shopItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shop items', error: error.message });
    }
};

// Get a single shop item by ID
const getShopItemById = async (req, res) => {
    try {
        const shopItem = await Shop.findById(req.params.id);
        if (!shopItem) {
            return res.status(404).json({ message: 'Shop item not found' });
        }
        res.status(200).json(shopItem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shop item', error: error.message });
    }
};

// Update a shop item
const updateShopItem = async (req, res) => {
    try {
        const { name, category, description, price, stock, size } = req.body;
        const photo = req.file ? req.file.filename : undefined;
        
        const updatedShopItem = await Shop.findByIdAndUpdate(
            req.params.id,
            { 
                $set: { 
                    name, 
                    category, 
                    description, 
                    price, 
                    stock, 
                    size, 
                    ...(photo && { photo }),  
                } },
            { new: true }
        );

        if (!updatedShopItem) {
            return res.status(404).json({ message: 'Shop item not found' });
        }

        res.status(200).json({ message: 'Shop item updated successfully', updatedShopItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating shop item', error: error.message });
    }
};

// Delete a shop item
const deleteShopItem = async (req, res) => {
    try {
        const deletedShopItem = await Shop.findByIdAndDelete(req.params.id);
        if (!deletedShopItem) {
            return res.status(404).json({ message: 'Shop item not found' });
        }
        res.status(200).json({ message: 'Shop item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shop item', error: error.message });
    }
};

export {
    createShopItem,
    getShopItems,
    getShopItemById,
    updateShopItem,
    deleteShopItem
};