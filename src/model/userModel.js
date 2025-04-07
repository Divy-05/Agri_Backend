import mongoose from "mongoose";

function getISTTime() {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const now = new Date();
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
}

const userSchema = new mongoose.Schema({
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

    role: {
        type: String,
        required: true,
    },

    contact_number : {
        type: Number,
        required: true,
        unique: true
    },
    
    address: {
        type: String,
        required: true
    }, 

    photo : {
        type: String,
    }
}, 
{
    timestamps: {
        currentTime: () => getISTTime()
    }
});

const User = mongoose.model('User', userSchema);

export default User;