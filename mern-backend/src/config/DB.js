import mongoose from "mongoose";
import chalk from 'chalk'

const dbConnection = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      // console.log(chalk.blue.bgGreen.bold(`MongoDB Connected at`), chalk.white.bgGreen.bold(`(${conn.connection.host}`));
      console.log(chalk.whiteBright.bgGreen.bold(`MongoDB Connected at - (${conn.connection.host}`));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  };

  export default dbConnection