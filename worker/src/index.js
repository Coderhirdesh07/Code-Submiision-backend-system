const express = require('express');
const app = express();
const {connectToDatabase} = require('../src/database/db.database.js');

connectToDatabase().then( () =>{
   app.listen(3000, () => {
     console.log('Worker Server started');
   });
  }
)

