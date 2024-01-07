const mongoose = require("mongoose");

const patchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    used: { type: Boolean, default: false },
    dateUsed: { type: String, default: null }, // Keep as String if it matches your current data format
    partOfDay: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening", null],
        default: null
    },
    timestamp: { type: Date, default: Date.now } // To record when this history entry was created
});

const PatchHistory = mongoose.model("PatchHistory", patchHistorySchema);

module.exports = PatchHistory;
