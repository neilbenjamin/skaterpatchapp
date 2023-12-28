const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, default: null },
  surname: { type: String, default: null },
  coachName: { type: String, default: null },
  wpnumber: { type: String, default: null },
  patchesRemaining: { type: Number, default: null },
  datePurchased: { type: String, default: null },  // Changed to String
  dateUsed: { type: String, default: null },       // Changed to String
  expiryDate: { type: String, default: null },     // Changed to String
  patchCardNumber: { type: String, default: null },
  purchaseInvoiceNumber: { type: String, default: null },
  contactNumberSkater: { type: String, default: null },
  contactNumberParent: { type: String, default: null },
  dateOfBirth: { type: String, default: null },    // Changed to String
  adminRole: { type: String, default: null },
  adminSupervisor: { type: String, default: null },
  contactNumberAdmin: { type: String, default: null },
  adminShift: { type: String, default: null },
  role: { type: String, default: "skater" },
  patches: [
    {
      used: Boolean,
      dateUsed: String,
      partOfDay: {
        type: String,
        enum: ["morning", "afternoon", "evening", null],
        default: null,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
