import express from "express"
const router = express.Router()
import multer from "multer"
import { CreateCompany, GetCompanyDetails, UpdateCompanyDetails } from "../controllers/CompanyController.js"
import { body } from "express-validator"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { IsHrAuth } from "../middlewares/IsHrAuth.js"


// multer config
const storage = multer.memoryStorage()
const upload = multer({storage})

// routes 
router.post("/create",AuthMiddleware,IsHrAuth,[
     body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
     body("name").notEmpty().withMessage("Name cannot be empty")
],CreateCompany)
router.get("/details",AuthMiddleware,IsHrAuth,GetCompanyDetails)
router.put("/update/:id",AuthMiddleware,IsHrAuth,upload.single("logo"),[
body("name").optional().notEmpty().withMessage("Name cannot be empty")
],UpdateCompanyDetails)

export default router
