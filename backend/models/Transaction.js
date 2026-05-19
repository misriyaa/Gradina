const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  workerName: { type: String, required: true },
  type: { type: String, enum: ['Advance', 'Salary'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
