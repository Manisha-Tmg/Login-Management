import mongoose from "mongoose";

const connectToDb = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/dw26666");
  console.log("Application is connected to database sucessfully");
};

export default connectToDb;
