const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createManager = async (req, res) => {
  try {
    const { username, password, assignedSite } = req.body;

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const manager = await User.create({
      username,
      password: hashedPassword,
      role: 'manager',
      assignedSite
    });

    res.status(201).json({
      _id: manager._id,
      username: manager.username,
      role: manager.role,
      assignedSite: manager.assignedSite
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: 'manager' }).populate('assignedSite', 'siteName');
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteManager = async (req, res) => {
  try {
    const manager = await User.findById(req.params.id);
    if (!manager) return res.status(404).json({ message: 'Manager not found' });
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: 'Manager removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createManager, getManagers, deleteManager };
