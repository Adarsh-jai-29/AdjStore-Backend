import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, optional: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, optional: true, unique: true },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;