const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("The connection with MongoDB is established");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

module.exports = connectToDatabase;
