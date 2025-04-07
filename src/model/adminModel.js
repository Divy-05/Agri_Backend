import mongoose from "mongoose";

function getISTTime() {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const now = new Date();
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
}

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: { 
        type: String, 
        required: true,
        unique: true
    },

    password : {
        type: String,
        required: true,
    },
    
    contact_number : {
        type: Number,
        required: true,
        unique: true
    },
}, 
{
    timestamps: {
        currentTime: () => getISTTime()
    }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;