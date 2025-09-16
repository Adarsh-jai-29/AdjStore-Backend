import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, optional: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true, unique: true },
  // image: { type: String, optional: true },
  createdAt: { type: Date, default: Date.now }

});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;