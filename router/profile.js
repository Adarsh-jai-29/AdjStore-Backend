import { Router } from "express";
import userAuth from "../middleware/auth.js";
const profileRouter = Router();

profileRouter.get("/view", userAuth, (req, res) => {
 
  try {
    const user = req.user;
    console.log("user from profile",user)
   res.status(200).json({ message: "Profile data", user});
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  


});

export default profileRouter;
