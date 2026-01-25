import express, { Router } from "express"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { IsEmployeeAuth } from "../middlewares/IsEmployeeAuth.js"
import { AttendanceCheckIn, AttendanceCheckOut, EachEmployeeMonthAttendance } from "../controllers/AttendanceController.js"
const router = express.Router() 


router.post("/check-in",AuthMiddleware,IsEmployeeAuth,AttendanceCheckIn)
router.put("/check-out",AuthMiddleware,IsEmployeeAuth,AttendanceCheckOut)
router.get("/monthly",AuthMiddleware,IsEmployeeAuth,EachEmployeeMonthAttendance)


export default router
