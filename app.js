import 'dotenv/config'

import express from 'express'
const app = express()
import mongoose from 'mongoose';
import authRouter from './router/auth.js';
import profileRouter from './router/profile.js';
import cors from 'cors';

import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3001


app.use(cors({
  origin: ["http://localhost:5173", "https://adj-store.vercel.app"], 
  credentials: true,
}));

// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.json());
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to MongoDB")
    
    // Run on port start
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`)
    })
  } 
  catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  
}
main()
