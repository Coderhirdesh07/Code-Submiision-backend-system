const mongoose = require('mongoose');


const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },

});

const Problem = mongoose.model('Problem',problemSchema);
module.exports = Problem;