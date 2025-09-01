import { Router } from "express";
const authRouter = Router();
import UserModel from "../Models/user.js";
import bcrypt from "bcrypt";

authRouter.post("/sign-up", async(req, res) => {
   const { email, password, firstName, lastName, mobile } = req.body;
  // Handle registration logic here
  const newUser = new UserModel({ email, password, firstName, lastName, mobile });

   await newUser.save();
   res.status(200).json({ msg: "User saved successfully", newUser });
  res.send("Register endpoint");
});

authRouter.post("/login", (req, res) => {
  // Handle login logic here
  res.send("Login endpoint");
});


export default authRouter;