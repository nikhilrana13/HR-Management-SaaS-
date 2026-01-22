import express from 'express';
import { LoginHr, RegisterHr } from '../controllers/AuthController.js';
import { body } from 'express-validator';
const router = express.Router();




// hr registration 
router.post("/register",[
    body("email").isEmail().normalizeEmail().withMessage("please provide a valid email"),
    body("password").isLength({min:6}).withMessage("password must be at least 6 characters long"),
    body("name").notEmpty().trim().escape().withMessage("name is required")],RegisterHr)
// hr login
router.post("/login",[
    body("email").notEmpty().isEmail().normalizeEmail().withMessage('please provide a valid email'),
     body("password").isLength({min:6}).isString().notEmpty().withMessage("password must be at least 6 characters long"),
],LoginHr)

export default router;