const express = require('express');
const router = express.Router();
const { logTransaction, getTransactions } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getTransactions)
  .post(protect, logTransaction);

module.exports = router;
