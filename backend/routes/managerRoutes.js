const express = require('express');
const router = express.Router();
const { createManager, getManagers, deleteManager } = require('../controllers/managerController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

router.route('/')
  .get(protect, adminOnly, getManagers)
  .post(protect, adminOnly, createManager);

router.route('/:id')
  .delete(protect, adminOnly, deleteManager);

module.exports = router;
