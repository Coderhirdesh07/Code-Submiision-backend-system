const express = require('express');
const router = express.Router();
const { verifyTokenWithRedis } = require('../middleware/auth.middleware.js');
const {
  handleProblemRunRoute,
  handleProblemSubmitRoute,
} = require('../controllers/submission.controllers.js');

// running routes
router.post('/run', verifyTokenWithRedis, handleProblemRunRoute);

// submission routes
router.post('/submit', verifyTokenWithRedis, handleProblemSubmitRoute);

module.exports = router;
