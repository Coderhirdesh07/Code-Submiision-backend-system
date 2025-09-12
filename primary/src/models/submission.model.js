const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    problemId:{
      type:String,
      require:true
    },
    language: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
    result:{
      type:String,
      enum:['Accepted','Time Limited Exceeded','Compile Error','Runtime Error','Wrong Answer','Pending'],
      require:true ,
      default:'Pending'     
    }
  },
  { timestamps: true }
);

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
