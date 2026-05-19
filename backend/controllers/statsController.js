const Site = require('../models/Site');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Transaction = require('../models/Transaction');

const getDashboardStats = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const totalSites = await Site.countDocuments();
      const totalManagers = await User.countDocuments({ role: 'manager' });
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const totalWorkersPresentToday = await Attendance.countDocuments({ date: { $gte: today }, status: 'Present' });
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const payrollResult = await Transaction.aggregate([
        { $match: { date: { $gte: startOfMonth }, type: 'Salary' } },
        { $group: { _id: null, totalPayroll: { $sum: "$amount" } } }
      ]);
      const totalMonthlyPayroll = payrollResult.length > 0 ? payrollResult[0].totalPayroll : 0;

      res.json({ totalSites, totalManagers, totalWorkersPresentToday, totalMonthlyPayroll });
    } else if (req.user.role === 'manager') {
      const siteId = req.user.assignedSite;
      const site = await Site.findById(siteId);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayAttendance = await Attendance.countDocuments({ siteId, date: { $gte: today }, status: 'Present' });

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const spendingResult = await Transaction.aggregate([
        { $match: { siteId: siteId, date: { $gte: startOfMonth } } },
        { $group: { _id: null, totalSpent: { $sum: "$amount" } } }
      ]);
      const thisMonthSpending = spendingResult.length > 0 ? spendingResult[0].totalSpent : 0;

      res.json({ siteName: site?.siteName, budget: site?.budget, todayAttendance, thisMonthSpending });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
