import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  user_firebase: String,
  user_name: String,
  user_avatar: String,
  user_email: String,
});

export const User = mongoose.models.User || mongoose.model("User", Schema);
