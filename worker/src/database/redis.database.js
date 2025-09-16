const { error } = require('console');
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
    console.error('Redis Connection failed', error);
  });
  await client.connect();
  console.log('Redis connection sucess');
  return client;
}

module.exports = { redisConnection };
