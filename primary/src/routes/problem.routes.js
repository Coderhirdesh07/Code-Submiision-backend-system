const express = require('express');
const router = express.Router();
const {
  handleProblemCreate,
  handleProblemInfo,
  handleProblemDelete,
} = require('../controllers/problem.controller.js');
const { verifyTokenWithRedis } = require('../middleware/auth.middleware');
const { verifyRole } = require('../middleware/role.middleware.js');

router.post('/create', verifyTokenWithRedis, verifyRole, handleProblemCreate);
router.post('/delete/:id', verifyTokenWithRedis, verifyRole, handleProblemDelete);
router.get('/:id', verifyTokenWithRedis, handleProblemInfo);

module.exports = router;
