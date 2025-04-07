import mongoose from "mongoose";

function getISTTime() {
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const now = new Date();
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
}

const aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    description: { 
        type: String, 
        required: true,
    },

    totalUsers: { 
        type: Number, 
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

const About = mongoose.model('About', aboutSchema);
export default About;