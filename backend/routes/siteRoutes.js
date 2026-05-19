const express = require('express');
const router = express.Router();
const { createSite, getSites, updateSite, deleteSite } = require('../controllers/siteController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { adminOnly: checkAdmin } = require('../middleware/roleMiddleware');

router.route('/')
  .get(protect, adminOnly || checkAdmin, getSites)
  .post(protect, adminOnly || checkAdmin, createSite);

router.route('/:id')
  .put(protect, adminOnly || checkAdmin, updateSite)
  .delete(protect, adminOnly || checkAdmin, deleteSite);

module.exports = router;
