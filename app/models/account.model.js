const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    country: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    dob: Date,
    mfa: { type: String, default: null },
    referredBy: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);