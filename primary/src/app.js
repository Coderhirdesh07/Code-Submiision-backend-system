const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes.js');
const submissionRoute = require('./routes/submission.routes.js');
const cookieparser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(
   cors({
    origin: 'http://localhost:4000', // or wherever you're testing from
    credentials: true,
   })
);
app.use(cookieparser());

// routes
app.use('/v1/user', userRoutes);
app.use('/v1/user/problem',submissionRoute);


module.exports = app;
