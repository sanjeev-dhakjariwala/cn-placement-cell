const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      colors.yellow(
        `CONNECTION TO DB SUCCESSFULL ${connection.connection.host}`
      )
    );
  } catch (err) {
    console.log(colors.red(`CONNECTION ${err.message}`));
    process.exit(1);
  }
};

module.exports = connectToDB;
