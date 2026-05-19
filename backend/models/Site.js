const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
  siteName: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  budget: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Site', siteSchema);
