import { Router } from "express";
const authRouter = Router();
import UserModel from '../Models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

authRouter.post("/sign-up", async(req, res) => {
   const { email, password, firstName, lastName, mobile } = req.body;

  try {
  // Check if user already exists
  const existingUser = await UserModel
    .findOne({ $or: [{ email }, { mobile }] });
  if (existingUser) {
    return res.status(400).json({ msg: "User with this email or mobile already exists" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("hashedPassword",hashedPassword);

  const newUser = new UserModel({ email, password: hashedPassword, firstName, lastName, mobile });
  await newUser.save();

  res.status(200).json({ msg: "User saved successfully", newUser });
}
catch (error) {
  console.error("Error during user registration:", error);
 return res.status(500).json({ msg: "Internal server error" });
}
})

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({email})
  if (!user){
    return res.status(401).json({message:'User not found'})
  }
  
  const isPasswordMatched = await bcrypt.compare(password, user.password);  
  if (!isPasswordMatched) {
    // validate()
    return res.status(401).json({ message: "Invalid Password" });
    }
    
    const token = jwt.sign({ _id : user._id }, process.env.SECRET_KEY || 'adjStore', { expiresIn: '24h' });
    res.cookie('token', token);
    res.status(200).json({ message: "Login Successful", user});
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logout Successful" });
  return res.redirect('/');
});


export default authRouter;