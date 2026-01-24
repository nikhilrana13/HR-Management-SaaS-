import express from "express"
import { IsHrAuth} from "../middlewares/IsHrAuth.js"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { AddEmployeeAndAssignDepartment, VerifyInviteTokenAndSetpassword } from "../controllers/EmployeeController.js"
const router = express.Router()


router.post("/add-employee",AuthMiddleware,IsHrAuth,AddEmployeeAndAssignDepartment)
router.put("/set-password",VerifyInviteTokenAndSetpassword)

export default router 
