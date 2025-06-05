import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/";

export const connectDb = async () => {
  let connection = await mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
