const jwt = require('jsonwebtoken');
const { redisConnection } = require('../database/redis.database.js');

const Secret_Key = process.env.ACCESS_TOKEN_SECRET_KEY;

async function verifyTokenWithRedis(request, response, next) {
  try {
    const token = request.cookies.token || request.headers.authorization?.split(' ')[1];

    if (!token) return response.status(400).json({ message: 'Token is Missing' });

    const decoded = jwt.verify(token, Secret_Key);

    const userId = decoded.id;
    const redisDb = await redisConnection();

    const storedValue = await redisDb.get(userId);

    if (!storedValue) return response.status(400).json({ message: 'Session expired' });

    const [storedToken, role, email] = storedValue.split(':');

    if (storedToken !== token) {
      return response.status(401).json({ message: 'Token mismatch' });
    }
    request.user = {
      id: userId,
      role,
      email,
    };
    return next();
  } catch (error) {
    console.log(`Invalid token or token expired+ ${error}`);
    return response.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { verifyTokenWithRedis };
