const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
