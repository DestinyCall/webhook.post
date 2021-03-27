const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 10, 
  serverSelectionTimeoutMS: 10000, 
  socketTimeoutMS: 45000, 
  family: 4, 
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection estblished succesfully");
});

module.exports = { mongoose };