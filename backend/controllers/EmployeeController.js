import { CompanyModel } from "../models/CompanyModel.js"
import { Department } from "../models/DepartmentModel.js"
import { Employee} from "../models/EmployeeModel.js"
import { HrModel } from "../models/HrModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Response } from "../utils/ResponseHandler.js"
import { validationResult } from "express-validator"
import cloudinary from "../config/cloudinary.js"
import { EmployeeMapper } from "../mappers/EmployeeMapper.js"



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

export const toggleActiveAndInActiveEmployee = async(req,res)=>{
    try {
            const hrId= req.user;
            const employeeId = req.params.id
            const { isActive } = req.body;
        
            const Hr = await HrModel.findById(hrId);
            if (!Hr) {
              return Response(res, 404, "Hr not found");
            }
            if (Hr.role !== "hr") {
              return Response(res, 403, "You are not authorized");
            }
            const employee = await Employee.findById(employeeId)
            if(!employee){
                return Response(res,404,"Employee not found")
            }
            employee.isActive = isActive
            await employee.save();
            return Response(res, 200, `Employee ${isActive ? 'active' :'inactive'} successfully`);
    } catch (error) {
        console.error("toggle employee error",error)
        return Response(res,500,"Internal server error")
    }
}

export const GetAllEmployees = async(req,res)=>{
    try {
        const hrId = req.user 
        const Hr = await HrModel.findById(hrId)
        if(!Hr){
            return Response(res,404,"Hr not found")
        }
        if(Hr.role !== "hr"){
            return Response(res,403,"You are not authorized")
        }
        const company = await CompanyModel.findOne({hrId})
        if(!company){
            return Response(res,404,"Company not found")
        }
        const employees = await Employee.find({companyId:company._id})
        if(!employees){
          return Response(res,200,"No Employees found",[])
        }
        return Response(res,200,"Employees found",employees)
    } catch (error) {
        console.error("failed to get employee",error)
        return Response(res,500,"Internal server error")
    }
}
export const UpdateEmployeeProfile = async(req,res)=>{
    try {
         const employeeId = req.user 
        // check for validation errors
         const errors =   validationResult(req);
         if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array())
         }
         const {name,email} = req.body 
         const file = req.file 

         const employee = await Employee.findById(employeeId)
         if(!employee){
            return Response(res,404,"employee not found")
         }
         if(employee.role !== "employee"){
            return Response(res,403,"You are not authorized")
         }
         if(employee._id.toString() !== employeeId){
            return Response(res,403,"You are not authorized to update")
         }
         let updateDate = {}
         if(name) updateDate.name = name
         if(email) updateDate.email = email
         if(file){
             const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
             const cloudResponse = await cloudinary.uploader.upload(imageBase64,{
                 folder: "Hr-management-saas",
                 resource_type: "image",
             })
             updateDate.profilepic = cloudResponse.secure_url
         }
         if(Object.keys(updateDate).length === 0){
            return Response(res,200,"No fields provided to update ")
         }
         const updatedEmployee = await Employee.findByIdAndUpdate(employeeId,{$set:updateDate},{new:true})
         return Response(res,200,"Profile update successfully",{user:EmployeeMapper(updatedEmployee)})
    } catch (error) {
        console.error("failed to update employee profile",error)
        return Response(res,500,"Internal server error")
    }
}

export const ChangeEmployeeAccountPassword = async(req,res)=>{
    try {
    const employeeId = req.user;
    const { oldpassword, newpassword } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return Response(res, 400, "Validation failed", errors.array());
    }
    if (oldpassword === newpassword) {
      return Response(
        res,
        400,
        "New password must be different from old password"
      );
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return Response(res, 404, "employee not found");
    }
    if(employee.role !== "employee"){
            return Response(res,403,"You are not authorized")
         }
    if(employee._id.toString() !== employeeId){
            return Response(res,403,"You are not authorized to update")
    }
    const isMatch = await bcrypt.compare(oldpassword,employee.password);
    if (!isMatch) {
      return Response(res, 401, "Old password is incorrect");
    }
    const hashpassword = await bcrypt.hash(newpassword, 10);
    await Employee.findByIdAndUpdate(
      employeeId,
      { $set: { password: hashpassword } },
      { new: true }
    );
    return Response(res, 200, "password change successfully");
    } catch (error) {
    console.error("failed to change password", error);
    return Response(res, 500, "Internal server error");
    }
} 












