const mongoose = require("mongoose");

const patchHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { type: String, default: null },
    surname: { type: String, default: null },
    used: { type: Boolean, default: false },
    dateUsed: { type: String, default: null },
    partOfDay: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening", null],
        default: null
    },
    timestamp: { type: Date, default: Date.now }
});

const PatchHistory = mongoose.model("PatchHistory", patchHistorySchema);

module.exports = mongoose.model("PatchHistory", patchHistorySchema);

