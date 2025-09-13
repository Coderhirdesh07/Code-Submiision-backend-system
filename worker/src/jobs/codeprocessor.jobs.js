const {handleDataFromQueue } = require('../queue/consumer.queue.js');

function handleCodeExecution(problemId,userId,code,language,type){
        if(type=='Run'){
            const result = handleCodeRunProcess(problemId,userId,code,language);
            return result;
        }
        else{
            const result = handleCodeSubmitProcess(problemId,userId,code,language);
            return result;
        }
}

async function handleCodeRunProcess(problemId,userId,code,language){

}

async function handleCodeSubmitProcess(problemId,userId,code,language){

}

module.exports = {handleCodeExecution};