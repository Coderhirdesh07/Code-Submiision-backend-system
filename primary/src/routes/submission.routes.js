const express = require('express');
const router = express.Router();
const {verifyJwt} = require('../middleware/auth.middleware.js');
const {handleProblemRunRoute,handleProblemSubmitRoute} = require('../controllers/submission.controllers.js');


// running routes
router.post('/run',verifyJwt,handleProblemRunRoute);

// submission routes
router.post('/submit',verifyJwt,handleProblemSubmitRoute);

module.exports = router;