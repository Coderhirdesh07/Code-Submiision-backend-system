const express = require('express');
const app = express();
const { connectToDatabase } = require('../src/database/db.database.js');
const { redisConnection } = require('../src/database/redis.database.js');
require('dotenv').config();


redisConnection();
connectToDatabase().then( () =>{
   app.listen(process.env.PORT, () => {
     console.log('Worker Server started .. ');
   });
  }
);