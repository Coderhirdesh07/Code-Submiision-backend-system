const { createClient } = require('redis');

let client;
async function redisConnection() {
  if (client && client.isOpen) {
    return client;
  }
  client = await createClient({
    url: process.env.REDIS_URL | 'redis://localhost:6379',
  });

  client.on(error, () => {
    console.log('Redis Connection failed');
  });
  await client.connect();
  return client;
}

module.exports = { redisConnection };
