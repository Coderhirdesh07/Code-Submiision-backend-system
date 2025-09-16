const { handleDataFromQueue } = require('../queue/consumer.queue.js');
const { dataPublishingChannel } = require('../utils/pubsub.utils.js');
const Submission = require('../models/submission.model.js');


// function to detect whether the type is run or submit requests
async function handleCodeExecution(){
    const message = handleDataFromQueue().split(':');
    const problemId = message[0];
    const userId = message[1];
    const code = message[2];
    const language = message[3];
    
        if(type=='Run'){
            const result = handleCodeRunProcess(problemId,userId,code,language);
            dataPublishingChannel(userId,result,problemId);
            return result;
        }
        else{
            const result = handleCodeSubmitProcess(problemId,userId,code,language);
            dataPublishingChannel(userId,result,problemId);
            const submitData = await handleDatabaseSubmission(userId,result,problemId,language);
            return result;
        }
}

// function to handle process if user wants to run the code for a test case
async function handleCodeRunProcess(problemId,userId,code,language){

}

// function to handle process if user wants to submit the code
async function handleCodeSubmitProcess(problemId,userId,code,language){

}

// function to update result in database
async function handleDatabaseSubmission(userId,result,problemId,language){

}

module.exports = {handleCodeExecution};