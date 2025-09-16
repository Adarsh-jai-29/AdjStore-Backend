import jwt from "jsonwebtoken";
import userModel from "../Models/User.js";

const userAuth = async (req, res, next) => {
     try {
            const {token} = req.cookies;
            if(!token){
            return res.status(401).json({ message: "Unauthorized" });
            }
            // Verify the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'adjStore');
            console.log("decoded token",decoded)

            // Find the user by email or ID from the decoded token
                const user = await userModel.findById(decoded._id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            
            // Attach user information to the request object
            req.user = user;
            // Call the next middleware or route handler
            next();
        } catch (err) {
    console.error('Auth error:', err);
  return  res.status(401).send('Authentication failed');
}
}

export default userAuth;