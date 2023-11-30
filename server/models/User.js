const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, default: null },
  surname: { type: String, default: null },
  coachName: { type: String, default: null },
  wpnumber: {type: String, default: null },
  patchesRemaining: {type: Number, default: null },
  datePurchased: { type: Date, default: null },
  dateUsed: { type: Date, default: null },
  expiryDate: { type: Date, default: null },
  patchCardNumber: { type: String, default: null },
  purchaseInvoiceNumber: { type: String, default: null},
  contactNumberSkater: { type: String, default: null },
  contactNumberParent: { type: String, default: null },
  dateOfBirth: { type: Date, default: null},
  adminName: { type: String, default: null},
  adminSurname: { type: String, default: null},
  adminRole: { type: String, default: null},
  adminSupervisor: { type: String, default: null},
  contactNumberAdmin: { type: String, default: null},
  adminShift: { type: String, default: null},
  role: { type: String, default: 'skater' } // Default role is 'skater'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
