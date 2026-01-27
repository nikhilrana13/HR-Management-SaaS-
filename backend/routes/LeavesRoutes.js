import express from "express"
import { AllEmployeesEachLeaveDetails, ApplyForLeave, ApprovedAndRejectLeave, EachLeavesDetails, EmployeeAllLeaves, EmployeeLeaveDashboardStats, GetAllEmployeeLeaves, HrLeaveDashboardStats } from "../controllers/LeaveController.js"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { IsEmployeeAuth } from "../middlewares/IsEmployeeAuth.js"
import { IsHrAuth } from "../middlewares/IsHrAuth.js"
const router = express.Router() 



// employee leave routes
router.post("/apply",AuthMiddleware,IsEmployeeAuth,ApplyForLeave)
router.get("/myleaves",AuthMiddleware,IsEmployeeAuth,EmployeeAllLeaves)
router.get("/employee/dashboard/stats",AuthMiddleware,IsEmployeeAuth,EmployeeLeaveDashboardStats)
router.get("/employee/:id",AuthMiddleware,IsEmployeeAuth,EachLeavesDetails)
// hr leave routes
router.put("/approveorreject",AuthMiddleware,IsHrAuth,ApprovedAndRejectLeave)
router.get("/all",AuthMiddleware,IsHrAuth,GetAllEmployeeLeaves)
router.get("/hr/dashboard/stats",AuthMiddleware,IsHrAuth,HrLeaveDashboardStats)
router.get("/hr/:id",AuthMiddleware,IsHrAuth,AllEmployeesEachLeaveDetails)



export default router