import express from "express"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
import { fetchAllNotifications, MarkReadNotifications } from "../controllers/NotificationController.js"
const router = express.Router()


router.get("/all",AuthMiddleware,fetchAllNotifications) 
router.get("/markread",AuthMiddleware,MarkReadNotifications) 

export default router 




