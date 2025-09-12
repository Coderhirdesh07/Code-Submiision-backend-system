const jwt = require('jsonwebtoken');

const Secret_Key = process.env.ACCESS_TOKEN_SECRET_KEY;
function verifyJwt(request, response, next) {
  try {
    const authHeader = request.headers.authorisation;
    if (!authHeader)
      return response
        .status(400)
        .json({ message: 'Missing or Invalid Auth TOken' });

    const token = authHeader.split('');
    const decodedToken = jwt.verify(token, Secret_Key);
    return next();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { verifyJwt };
