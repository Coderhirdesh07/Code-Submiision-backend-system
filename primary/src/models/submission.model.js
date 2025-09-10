const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
