const Transaction = require('../models/Transaction');

const logTransaction = async (req, res) => {
  try {
    const { workerName, type, amount, date } = req.body;
    const siteId = req.user.role === 'admin' ? req.body.siteId : req.user.assignedSite;

    if (!siteId) return res.status(400).json({ message: 'Site ID is required' });

    const transaction = await Transaction.create({ workerName, type, amount, date, siteId });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'manager') {
      query.siteId = req.user.assignedSite;
    } else if (req.query.siteId) {
      query.siteId = req.query.siteId;
    }

    if (req.query.startDate && req.query.endDate) {
      query.date = { $gte: new Date(req.query.startDate), $lte: new Date(req.query.endDate) };
    }

    const transactions = await Transaction.find(query).populate('siteId', 'siteName').sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logTransaction, getTransactions };
