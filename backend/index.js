import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { configure } from './config/db.js';
import AuthRoute from './routes/AuthRoutes.js'
import CompanyRoute from './routes/CompanyRoutes.js'
import DepartmentRoute from './routes/DepartmentRoutes.js'
import EmployeeRoute from './routes/EmployeeRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// middleware 
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



// routes 
app.use('/api/auth',AuthRoute)
app.use('/api/company',CompanyRoute)
app.use('/api/department',DepartmentRoute)
app.use('/api/employee',EmployeeRoute)


// connect to database
configure()


// app.use("/",(req,res)=>{
//     res.send("API is running...");
// })


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

