import express from "express"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { IsHrAuth } from "../middlewares/IsHrAuth.js"
import { CreateAnnouncement, GetAllCompanyAnnouncements } from "../controllers/AnnouncementController.js"
const router = express.Router()


router.post("/create",AuthMiddleware,IsHrAuth,CreateAnnouncement)
router.get("/company",AuthMiddleware,GetAllCompanyAnnouncements)

export default router 

