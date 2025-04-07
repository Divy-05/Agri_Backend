import mongoose from "mongoose";

function getISTTime() {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const now = new Date();
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
}

const contactSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },

    contact_number : {
        type: Number,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true
    },  
}, 
{
    timestamps: {
        currentTime: () => getISTTime()
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;