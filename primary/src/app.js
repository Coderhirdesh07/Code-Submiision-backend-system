const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes.js');
const submissionRoute = require('./routes/submission.routes.js');
const problemRoutes = require('./routes/problem.routes.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // or wherever you're testing from
    credentials: true,
  })
);
app.use(cookieParser());

// routes
app.use('/v1/user', userRoutes);
app.use('/v1/submission', submissionRoute);
app.use('/v1/problem', problemRoutes);

module.exports = app;
