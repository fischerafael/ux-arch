import mongoose from "mongoose";

const mongoURL = process.env.MONGO_DB;

export async function db() {
  if (!mongoURL) throw new Error("No mongo url provided");

  mongoose.connect(mongoURL).then((mongoose) => {
    return mongoose;
  });
}
