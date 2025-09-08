const express = require('express')
const { connectToDatabase } = require('./database/db.database.js');
require('dotenv').config()
const app = express();

const PORT = process.env.PORT
connectToDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server started at ${PORT}`);
    });
})
