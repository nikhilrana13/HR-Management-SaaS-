import express, { Router } from "express"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { IsEmployeeAuth } from "../middlewares/IsEmployeeAuth.js"
import {IsHrAuth} from "../middlewares/IsHrAuth.js"
import { AllEmployeedailyAttendanceData, AttendanceCheckIn, AttendanceCheckOut, AttendanceDashboardStats, EachEmployeeAttendanceStats, EachEmployeeMonthAttendance } from "../controllers/AttendanceController.js"
const router = express.Router() 

// employee dashboard api's
router.post("/check-in",AuthMiddleware,IsEmployeeAuth,AttendanceCheckIn)
router.put("/check-out",AuthMiddleware,IsEmployeeAuth,AttendanceCheckOut)
router.get("/monthly",AuthMiddleware,IsEmployeeAuth,EachEmployeeMonthAttendance)
router.get("/details",AuthMiddleware,IsEmployeeAuth,EachEmployeeAttendanceStats)
// hr dashboard api's
router.get("/stats",AuthMiddleware,IsHrAuth,AttendanceDashboardStats)
router.get("/daily",AuthMiddleware,IsHrAuth,AllEmployeedailyAttendanceData)


export default router
