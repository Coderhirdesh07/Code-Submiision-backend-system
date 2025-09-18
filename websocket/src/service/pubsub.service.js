const { redisConnection } = require('../service/redis.service.js');

const subscriber = redisConnection();

function handleMessageFromChannel(message) {
  const processedMessage = message;
  return processedMessage;
}

async function dataSubscribingChannel() {
  try {
    await subscriber.connect();
    // Subscriber subscribes to 'news' channel
    const subcribingChannel = process.env.REDIS_SUBSCRIBER_NAME;

    await subscriber.subscribe(subcribingChannel, message => {
      console.log(`Received message from channel`);
      handleMessageFromChannel(message);
    });
  } catch (error) {
    console.log('Redis Connection failed');
  }
}

module.exports = { dataSubscribingChannel };
