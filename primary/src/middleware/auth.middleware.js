const jwt = require('jsonwebtoken');
const { redisConnection } = require('../database/redis.database.js');

const Secret_Key = process.env.ACCESS_TOKEN_SECRET_KEY;

async function verifyTokenWithRedis(request, response, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    const redisDb = await redisConnection();
    const { email } = request.body;

    if (!email) return response.status(400).json({ message: 'Email not found' });

    const isUserLoggedIn = await redisDb.GET(email);

    if (!isUserLoggedIn)
      return response.status(400).json({ message: 'User Not logged in or token is invalid' });

    const isTokenValid = jwt.verify(isUserLoggedIn, Secret_Key);
    return next();
  } catch (error) {
    console.log('Jwt Error occured');
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { verifyTokenWithRedis };
