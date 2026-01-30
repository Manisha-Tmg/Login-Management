import mongoose from "mongoose";
import { dbUrl } from "../config.js";

const connectToDb = async () => {
  await mongoose.connect(dbUrl);
  console.log("Application is connected to database sucessfully");
};

export default connectToDb;
