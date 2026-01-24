import { CompanyModel } from "../models/CompanyModel.js"
import { Department } from "../models/DepartmentModel.js"
import { Employee } from "../models/EmployeeModel.js"
import { HrModel } from "../models/HrModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Response } from "../utils/ResponseHandler.js"



export const AddEmployeeAndAssignDepartment = async(req,res)=>{
    try {
        const hrId = req.user
        const {name,email,department,position,} = req.body 
        if(!name || !email || !department || !position){
            return Response(res,400,"All fields are required")
        }
        const Hr = await HrModel.findById(hrId)
        if(!Hr){
            return Response(res,404,"Hr not found")
        }
        const company = await CompanyModel.findOne({hrId})
        if(!company){
            return Response(res,404,"Company not found")
        }
        const existingEmployee = await Employee.findOne({email,companyId:company._id})
        if(existingEmployee){
            return Response(res,400,"Employee already exists")
        }
        const dept = await Department.findOne({name:department,companyId:company._id})
        if(!dept){
            return Response(res,404,"Department not found")
        }
        const employee = await Employee.create({
            name,
            email,
            position,
            department,
            departmentId:dept._id,
            companyId:company._id
        })
        dept.employees.push(employee._id)
        await dept.save()
        // generate invite jwt token link and send it to employee to set password  
        const invitetoken = jwt.sign({id:employee._id,role:"employee",purpose:"invite"},process.env.JWT_SECRET,{expiresIn:'48h'})
        const inviteLink = `${process.env.NEXT_FRONTEND_URL}/set-password/${invitetoken}`
        return Response(res,200,"Employee added successfully",{inviteLink})

    } catch (error) {
        console.error("failed to add employee",error)
        return Response(res,500,"Internal server error")
    }
}
export const VerifyInviteTokenAndSetpassword = async(req,res)=>{
    try {
        const {token,password} = req.body 
        if(!token || !password){
            return Response(res,400,"All fields are required")
        }
        if(!token){
            return Response(res,400,"Token not found")
        }
        if(password.length < 6){
            return Response(res,400,"Password must be at least 6 characters long")
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.purpose !== "invite" || decoded.role !== "employee"){
            return Response(res,401,"Invalid or expired invite token")
        }
        const employee = await Employee.findById(decoded.id)
        if(!employee){
            return Response(res,404,"Employee not found")
        }
        if(employee.isActive){
            return Response(res,400,"Password already set")
        }
        const hashpassword = await bcrypt.hash(password,10)
        employee.password = hashpassword 
        employee.isActive = true
        await employee.save()
        return Response(res,200,"Password set successfully.You can now login")
    } catch (error) {
        console.error("failed to set password",error)
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
          return Response(res, 401, "Invite link expired or invalid");
        }
        return Response(res,500,"Internal server error")
        
    }
}



