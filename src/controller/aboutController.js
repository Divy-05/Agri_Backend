import About from "../model/aboutModel.js";

// Create a new About
const createAbout = async (req, res) => {
    try {
        const { title, description, totalUsers } = req.body;
        const photo = req.file ? req.file.path : null; // Store uploaded file path

        const newAbout = new About({ title, description, totalUsers, photo });
        await newAbout.save();
        res.status(201).json(newAbout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Abouts
const getAllAbouts = async (req, res) => {
    try {
        const abouts = await About.find();
        res.status(200).json(abouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single About by ID
const getAboutById = async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        if (!about) return res.status(404).json({ message: "About not found" });
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an About by ID
const updateAbout = async (req, res) => {
    try {
        const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAbout) return res.status(404).json({ message: "About not found" });
        res.status(200).json(updatedAbout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an About by ID
const deleteAbout = async (req, res) => {
    try {
        const deletedAbout = await About.findByIdAndDelete(req.params.id);
        if (!deletedAbout) return res.status(404).json({ message: "About not found" });
        res.status(200).json({ message: "About deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createAbout,
    getAllAbouts,
    getAboutById,
    updateAbout,
    deleteAbout
}