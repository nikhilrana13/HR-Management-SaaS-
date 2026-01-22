import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { configure } from './config/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// middleware 
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



// routes 




// connect to database
configure()


// app.use("/",(req,res)=>{
//     res.send("API is running...");
// })


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

