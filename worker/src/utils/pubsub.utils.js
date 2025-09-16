const { handleCodeExecution } = require('../jobs/codeprocessor.jobs.js');
const {redisConnection} = require('../database/redis.database.js');

const subscriber = redisConnection();
async function dataPublishChannel(userId,codeResult,problemId){
  try{
    await subscriber.connect();
    
    const userCodeResult = `${problemId} + ":" +${userId} + ":" + ${codeResult}`;

    const publishingChannel = process.env.REDIS_SUBSCIBER_NAME;
  // Publisher sends a message to 'news' channel after a delay
   setTimeout(async () => {
     await publisher.publish(publishingChannel, userCodeResult);
   }, 1000);
  }
  catch(error){
    console.error("Publishing message to channel failed");
  }
}

module.exports = { dataPublishChannel };
