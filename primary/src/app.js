const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes.js');


app.use('/v1/user',userRoutes);



module.exports = app;
