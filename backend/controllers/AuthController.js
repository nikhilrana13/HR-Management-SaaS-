import { HrModel } from "../models/HrModel.js";
import bcrypt from "bcryptjs";
import { Response } from "../utils/ResponseHandler.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Employee } from "../models/EmployeeModel.js";
import dotenv from "dotenv";
import { EmployeeMapper } from "../mappers/EmployeeMapper.js";
import { HrMapper } from "../mappers/HrMapper.js";

dotenv.config();


// handle hr registration
export const RegisterHr = async (req,res)=>{
    try {
        // check for validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array());
        }
        const {name,email,password} = req.body;
        // check if hr already exists
        const Hr = await HrModel.findOne({email});
        if(!Hr){
              const hashpassword = await bcrypt.hash(password,10)
              await HrModel.create({
                name,
                email,
                password:hashpassword
              })
              return Response(res,201,"HR registered successfully");
        }else{
            return Response(res,400,"HR already exists");
        }
    } catch (error) {
        console.error("Error in RegisterHr:", error);
        return Response(res,500,"Internal Server Error");
    }
}
// handle hr and employee login
export const LoginHr = async(req,res)=>{
    try { 
        // check for validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array());
        }
        const {email,password} = req.body;
        // check if hr  or employee exists or not 
        let user = await HrModel.findOne({email})
        let role = "hr"
          // if HR not found → check Employee
        if(!user){
             user = await Employee.findOne({email})
             role = "employee"
        }
        if(!user){
            return Response(res,400,"Invalid credentials")
        }else{
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return Response(res,400,"Password or email is incorrect")
            }
            // generate jwt token
            const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})
            res.cookie("token",token,{httpOnly:true,secure:true,sameSite:'none'})
            if(role === "employee"){
                user.isActive = true;
                await user.save()
                return Response(res,200,"Login successfully",{user:EmployeeMapper(user),token})
            }else{
                user.isverified = true 
                await user.save()
                return Response(res,200,"Login successfully",{user:HrMapper(user),token})
            }
        }
    } catch (error) {
        console.error("Error in Login user:", error);
        return Response(res,500,"Internal Server Error");
    }
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:true,sameSite:'none'})
        return Response(res,200,"Logout successfully")
    } catch (error) {
        console.error("Error in Logout user:", error);
        return Response(res,500,"Internal Server Error");
    }
}



