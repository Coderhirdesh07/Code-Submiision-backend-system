require('dotenv').config();
const { connectToDatabase } = require('./database/db.database.js');
const app = require('./app.js');
const { redisConnection } = require('./database/redis.database.js');

const PORT = process.env.PORT;

redisConnection();
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});
