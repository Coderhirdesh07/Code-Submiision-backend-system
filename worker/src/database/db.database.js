const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to Database');
    return db;
  } catch (error) {
    console.error('Database cannot be connected');
  }
}
module.exports = { connectToDatabase };
