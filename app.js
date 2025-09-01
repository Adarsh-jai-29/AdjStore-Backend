import express from 'express'
const app = express()
import mongoose from 'mongoose';
import authRouter from './router/auth';

const PORT = process.env.PORT || 3001


// app.use(cors({
//   origin: 'http://localhost:3001', // Allow requests from localhost:3001

// }));

app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use("/auth", authRouter);

async function main() {
  try {
    await mongoose.connect('mongodb+srv://adarshjai:D9xFTcCJyXb2nUaR@cluster0.v1horju.mongodb.net/adjCart?retryWrites=true&w=majority')
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
