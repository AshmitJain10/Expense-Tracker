const { log } = require("console");
const mongoose = require("mongoose");

const connnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //   useNewUrlParser: true,
      //   //useCreateIndex: true,
      //   useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (c) {
    console.log(`Error: ${c.message}`.red);
    process.exit(1);
  }
};

module.exports = connnectDB;
