import { validationResult } from "express-validator";
import { HrModel } from "../models/HrModel.js";
import { Response } from "../utils/ResponseHandler.js";
import cloudinary from "../config/cloudinary.js";
import { HrMapper } from "../mappers/HrMapper.js";
import bcrypt from "bcryptjs";




export const UpdateHrProfile = async(req,res)=>{
    try {
             const hrId = req.user 
            // check for validation errors
             const errors =   validationResult(req);
             if(!errors.isEmpty()){
                return Response(res,400,"Validation errors",errors.array())
             }
             const {name,email} = req.body 
             const file = req.file 
    
             const hr = await HrModel.findById(hrId)
             if(!hr){
                return Response(res,404,"hr not found")
             }
             if(hr.role !== "hr"){
                return Response(res,403,"You are not authorized")
             }
             if(hr._id.toString() !== hrId){
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
             const updatedhr = await HrModel.findByIdAndUpdate(hrId,{$set:updateDate},{new:true})
             return Response(res,200,"Profile update successfully",{user:HrMapper(updatedhr)})
        } catch (error) {
            console.error("failed to update hr profile",error)
            return Response(res,500,"Internal server error")
        }
}

export const ChangeHrAccountPassword = async(req,res)=>{
     try {
        const hrId = req.user;
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
        const hr = await HrModel.findById(hrId);
        if (!hr) {
          return Response(res, 404, "Hr not found");
        }
        if(hr.role !== "hr"){
                return Response(res,403,"You are not authorized")
        }
        if(hr._id.toString() !== hrId){
            return Response(res,403,"You are not authorized to update")
        }
        const isMatch = await bcrypt.compare(oldpassword,hr.password);
        if (!isMatch) {
          return Response(res, 401, "Old password is incorrect");
        }
        const hashpassword = await bcrypt.hash(newpassword, 10);
        await HrModel.findByIdAndUpdate(
          hrId,
          { $set: { password: hashpassword } },
          { new: true }
        );
        return Response(res, 200, "password change successfully");
        } catch (error) {
        console.error("failed to change password", error);
        return Response(res, 500, "Internal server error");
        }
}


