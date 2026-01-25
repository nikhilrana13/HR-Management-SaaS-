import express from "express"
import multer from "multer"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { IsHrAuth } from "../middlewares/IsHrAuth.js"
import { ChangeHrAccountPassword, UpdateHrProfile } from "../controllers/HrController.js"
import { body } from "express-validator"

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({storage})

router.put("/updateprofile",AuthMiddleware,IsHrAuth,upload.single("profilepic"),body("email").optional().notEmpty().withMessage("Email is required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
body("name").optional().notEmpty().withMessage("Name cannot be empty"),UpdateHrProfile)
router.put("/changepassword",AuthMiddleware,IsHrAuth,[body('oldpassword').notEmpty().withMessage('Old Password is required')
.isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),body('newpassword').notEmpty()
.withMessage('New Password is required').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],ChangeHrAccountPassword)


export default router