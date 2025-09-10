const { connectToDatabase } = require('./database/db.database.js');
const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT;
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});
