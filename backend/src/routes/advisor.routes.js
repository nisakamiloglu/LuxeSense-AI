const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getPerformance } = require('../controllers/advisor.controller');

router.get('/performance', protect, getPerformance);

module.exports = router;
