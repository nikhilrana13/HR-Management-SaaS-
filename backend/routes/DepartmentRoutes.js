import express from "express"
import { CreateDepartment, GetAlldepartment, ToggleEnableandDisableDepartment, UpdateDepartment } from "../controllers/DepartmentController.js"
import { IsHrAuth } from "../middlewares/IsHrAuth.js"
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js"
const router = express.Router()

router.post('/create',AuthMiddleware,IsHrAuth,CreateDepartment)
router.get('/all',AuthMiddleware,IsHrAuth,GetAlldepartment)
router.put('/update/:id',AuthMiddleware,IsHrAuth,UpdateDepartment)
router.put('/toggle/:id',AuthMiddleware,IsHrAuth,ToggleEnableandDisableDepartment)


export default router


