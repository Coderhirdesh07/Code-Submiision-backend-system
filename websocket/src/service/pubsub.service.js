const redis = require('redis');

// Create a subscriber client
const subscriber = redis.createClient();

// // Create a publisher client
// const publisher = redis.createClient();

async function run() {
  // Connect both clients
    await subscriber.connect();
  //  await publisher.connect();

  // Subscriber subscribes to 'news' channel
  await subscriber.subscribe('news', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Publisher sends a message to 'news' channel after a delay
//   setTimeout(async () => {
//     await publisher.publish('news', 'Hello from Node.js Redis Pub/Sub!');
//   }, 1000);
}

run().catch(console.error);
