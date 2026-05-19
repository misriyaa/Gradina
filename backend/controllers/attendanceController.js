const Attendance = require('../models/Attendance');

const markAttendance = async (req, res) => {
  try {
    const { workerName, date, status } = req.body;
    const siteId = req.user.role === 'admin' ? req.body.siteId : req.user.assignedSite;

    if (!siteId) return res.status(400).json({ message: 'Site ID is required' });

    const attendance = await Attendance.create({ workerName, date, status, siteId });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'manager') {
      query.siteId = req.user.assignedSite;
    } else if (req.query.siteId) {
      query.siteId = req.query.siteId;
    }

    if (req.query.date) {
      const targetDate = new Date(req.query.date);
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    const attendanceRecords = await Attendance.find(query).populate('siteId', 'siteName').sort({ date: -1 });
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { markAttendance, getAttendance };
