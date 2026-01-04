const jwt = require('jsonwebtoken');
const { redisConnection } = require('../database/redis.database.js');

const Secret_Key = process.env.ACCESS_TOKEN_SECRET_KEY;

async function verifyTokenWithRedis(request, response, next) {
  try {
    const token = request.cookies.token || request.headers.authorisation?.split('')[1];

    if (!token) response.status(400).json({ message: 'Token is Missing' });

    const decoded = jwt.verify(token, Secret_Key);

    const userId = decoded.id;
    const redisDb = await redisConnection();

    const storedToken = await redisDb.get(userId);

    if (!storedToken) return response.status(400).json({ message: 'Session expired' });

    if (storedToken !== token) {
      return response.status(400).json({ message: 'Token Mismatch' });
    }
    request.user = decoded;
    next();
  } catch (error) {
    console.log(`Invalid token or token expired+ ${error}`);
  }
}

module.exports = { verifyTokenWithRedis };
