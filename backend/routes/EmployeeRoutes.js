import express from "express"
import { IsHrAuth} from "../middlewares/IsHrAuth.js"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import {IsEmployeeAuth} from "../middlewares/IsEmployeeAuth.js"
import { AddEmployeeAndAssignDepartment, ChangeEmployeeAccountPassword, GetAllEmployees, toggleActiveAndInActiveEmployee, UpdateEmployeeProfile, VerifyInviteTokenAndSetpassword } from "../controllers/EmployeeController.js"
import { body } from "express-validator"
import multer from "multer"
const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({storage})

router.post("/add-employee",AuthMiddleware,IsHrAuth,AddEmployeeAndAssignDepartment)
router.get("/all",AuthMiddleware,IsHrAuth,GetAllEmployees)
router.put("/set-password",VerifyInviteTokenAndSetpassword)
router.put("/status/:id",AuthMiddleware,IsHrAuth,toggleActiveAndInActiveEmployee)
router.put("/updateprofile",AuthMiddleware,IsEmployeeAuth,upload.single("profilepic"),body("email").optional().notEmpty().withMessage("Email is required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
body("name").optional().notEmpty().withMessage("Name cannot be empty"),UpdateEmployeeProfile)
router.put("/changepassword",AuthMiddleware,IsEmployeeAuth,[body('oldpassword').notEmpty().withMessage('Old Password is required')
.isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),body('newpassword').notEmpty()
.withMessage('New Password is required').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],ChangeEmployeeAccountPassword)


export default router 
