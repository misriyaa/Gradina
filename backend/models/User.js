const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager'], required: true },
  assignedSite: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
