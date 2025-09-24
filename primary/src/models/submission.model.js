const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    problemId: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      enum: [
        'Accepted',
        'Time Limited Exceeded',
        'Compile Error',
        'Runtime Error',
        'Wrong Answer',
        'Pending',
      ],
      required: true,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
