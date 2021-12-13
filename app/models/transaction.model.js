const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    userEmail: String,
    amount: Number,
    type: String
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Transaction', TransactionSchema);