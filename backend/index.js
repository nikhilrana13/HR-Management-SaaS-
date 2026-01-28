import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from "http"
import { configure } from './config/db.js';
import AuthRoute from './routes/AuthRoutes.js'
import CompanyRoute from './routes/CompanyRoutes.js'
import DepartmentRoute from './routes/DepartmentRoutes.js'
import EmployeeRoute from './routes/EmployeeRoutes.js'
import HrRoute from './routes/HrRoutes.js'
import AttendanceRoute from "./routes/AttendanceRoutes.js"
import { MarkedAutoAbsent } from './jobs/AutoAbsent.js';
import LeaveRoute from './routes/LeavesRoutes.js'
import AnnouncementRoute from "./routes/AnnouncementRoutes.js"
import { initializeSocket } from './config/socketService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// middleware 
app.use(cors({
    origin:process.env.NEXT_FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// create socket io server
const server = http.createServer(app)
initializeSocket(server)


// routes 
app.use('/api/auth',AuthRoute)
app.use('/api/company',CompanyRoute)
app.use('/api/department',DepartmentRoute)
app.use('/api/employee',EmployeeRoute)
app.use('/api/hr',HrRoute)
app.use('/api/attendance',AttendanceRoute)
app.use('/api/leave',LeaveRoute)
app.use('/api/announcement',AnnouncementRoute)

// connect to database
configure()
// app.use("/",(req,res)=>{
//     res.send("API is running...");
// })
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    MarkedAutoAbsent()
})

