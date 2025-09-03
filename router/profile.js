import { Router } from "express";
const profileRouter = Router();
import jwt from "jsonwebtoken";

profileRouter.get("/view", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY
      || 'adjStore');
   const {user} = decoded;
   console.log(user)

   res.status(200).json({ message: "Profile data", user});
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  


});

export default profileRouter;
