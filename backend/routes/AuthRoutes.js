import express from 'express';
import { LoginHr, RegisterHr } from '../controllers/AuthController.js';
import { body } from 'express-validator';
const router = express.Router();




// hr registration 
router.post("/register",[
    body("email").isEmail().withMessage("Email is required").isEmail().withMessage("please provide a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("password must be at least 6 characters long"),
    body("name").notEmpty().trim().escape().withMessage("name is required")],RegisterHr)
// hr login
router.post("/login",[
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage('please provide a valid email').normalizeEmail(),
     body("password").notEmpty().withMessage("Password is required").isString().withMessage("Password must be string").isLength({min:6}).withMessage("password must be at least 6 characters long"),
],LoginHr)

export default router;