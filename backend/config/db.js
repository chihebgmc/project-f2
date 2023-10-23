const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Could not connect to MongoDB: ${error.message}`.red);
  }
};

// Export the module
module.exports = connectDB;
