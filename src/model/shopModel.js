import mongoose from "mongoose";

function getISTTime() {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const now = new Date();
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
}

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    category: { 
        type: String,
        required: true,
        enum: ["Agriculture Products" ,"Farming Products" , "Fresh Vegetables", "Harvest products",]
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    stock : {
        type: String,
        required: true,
    },

    size : {
        type: String,
        required: true,
    },

    color : {
        type: String,
        required: true,
    },
    
    photo : {
        type: String,
    },
}, 
{
    timestamps: {
        currentTime: () => getISTTime()
    }
});

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;