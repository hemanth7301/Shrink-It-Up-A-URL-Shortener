const mongoose = require("mongoose");

//Accessing environment variables
require("dotenv").config();

//Function for DB connection
const connect = () => {
  return mongoose.connect(process.env.DB_URL);
};

module.exports = connect;
