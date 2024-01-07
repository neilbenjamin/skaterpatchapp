const PatchHistory = require('../models/PatchHistory'); // Import the model
const User = require('../models/User'); // Import User model to fetch user's name and surname

const jwt = require("jsonwebtoken");

// CREATE Patch History
exports.createPatchHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const patchData = req.body; // Contains details about the patch used

        // Fetch user's name and surname
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newPatchHistory = new PatchHistory({
            userId: userId,
            name: user.name, // User's name from User model
            surname: user.surname, // User's surname from User model
            used: patchData.used,
            dateUsed: patchData.dateUsed,
            partOfDay: patchData.partOfDay,
            // Add any other relevant fields from patchData
        });

        await newPatchHistory.save();

        res.status(201).json({ 
            message: "Patch history created successfully", 
            patchHistory: newPatchHistory 
        });
    } catch (error) {
        console.error('Error creating patch history:', error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// GET Patch History
exports.getPatchHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const history = await PatchHistory.find({ userId: userId }).sort({ timestamp: -1 });

        if (history.length === 0) {
            return res.status(200).json({ message: "No patch history found for this user" });
        }

        res.status(200).json({
            message: "Patch history retrieved successfully",
            patchHistory: history
        });
    } catch (error) {
        console.error('Error fetching patch history:', error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};
