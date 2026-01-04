const express = require('express');
const router = express.Router();
const {
  handleProblemCreate,
  handleProblemInfo,
  handleProblemDelete,
} = require('../controllers/problem.controller.js');

router.post('/create', handleProblemCreate);
router.post('/delete/:id', handleProblemDelete);
router.get('/:id', handleProblemInfo);

module.exports = router;
