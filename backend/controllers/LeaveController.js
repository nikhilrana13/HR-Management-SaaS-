import { Employee } from "../models/EmployeeModel.js"
import { Leave } from "../models/LeaveModel.js"
import { CompanyModel } from "../models/CompanyModel.js"
import { Response } from "../utils/ResponseHandler.js"
import { response } from "express"
import { HrModel } from "../models/HrModel.js"

export const ApplyForLeave = async(req,res)=>{
        try {
             const employeeId = req.user
             const {leaveType,title,reasonforleave,startDate,endDate} = req.body
             
             // Validate all required fields
             if(!leaveType || !title || !reasonforleave || !startDate || !endDate){
                return Response(res,400,"All fields are required")
             }
             
             // Validate reasonforleave character limit
             if(reasonforleave.length > 400){
                return Response(res,400,"Reason for leave must not exceed 400 characters")
             }
             
             // Validate date format and logic
             const start = new Date(startDate)
             const end = new Date(endDate)
             
             if(isNaN(start.getTime()) || isNaN(end.getTime())){
                return Response(res,400,"Invalid date format")
             }
             
             if(end < start){
                return Response(res,400,"End date must be after start date")
             }
             
             const today = new Date()
             today.setHours(0, 0, 0, 0)
             if(start < today){
                return Response(res,400,"Cannot apply for past dates")
             }
             
             // Fetch employee and validate
             const employee = await Employee.findById(employeeId)
             if(!employee){
                return Response(res,404,"Employee not found")
             }
             if(employee.role !== "employee"){
                return Response(res,403,"You are not authorized")
             }
             
             // Fetch company
             const company = await CompanyModel.findById(employee.companyId)
             if(!company){
                return Response(res,404,"Company not found")
             } 
             
             // Check for overlapping leaves for the same employee
             const overlappingLeave = await Leave.findOne({
                 employeeId,
                 companyId: company._id,
                 $or: [
                     { startDate: { $lte: end }, endDate: { $gte: start } }
                 ]
             })
             
             if(overlappingLeave){
                return Response(res,400,"Leave already applied for overlapping duration")
             } 
             // Create leave record
             const leave = await Leave.create({
                 employeeId,
                 companyId: company._id,
                 leaveType,
                 title,
                 reasonforleave,
                 startDate: start,
                 endDate: end,
                 appliedOn: new Date()
             })
             return Response(res,201,"Leave applied successfully and waiting for approval",{leave})
        } catch (error) {
            console.error('Failed to apply leave:', error.message)
            return Response(res,500,"Internal server error")
        }
}
export const EmployeeAllLeaves = async(req,res)=>{
    try {
        const employeeId = req.user 
        let {page = 1,limit = 5} = req.query 
        page = parseInt(page)
        limit = parseInt(limit)
        const skip = (page - 1) * limit

        const employee = await Employee.findById(employeeId)
        if(!employee){
            return Response(res,404,"Employee not found")
        }
        if(employee.role !== "employee"){
            return Response(res,403,"You are not authorized")
        }
        const leaves = await Leave.find({employeeId}).populate("approvedBy","name").populate("rejectedBy","name").skip(skip).limit(limit).sort({createdAt:-1}).lean()

        const totalLeaves = await Leave.countDocuments({employeeId})
        const totalPages = Math.ceil(totalLeaves / limit)

        if(leaves.length === 0){
            return response(res,200,"No leaves found",[])
        }
        return Response(res,200,"Leaves found",{leaves,pagination:{
            currentPage:page,
            totalPages,
            totalLeaves,
            limit:limit
        }})
    } catch (error) {
        console.log("failed to get leaves",error)
        return Response(res,500,"Internal server error")
    }
}
export const EachLeavesDetails = async(req,res)=>{
      try {
          const employeeId = req.user 
          const leaveId = req.params.id

          const employee = await Employee.findById(employeeId)
          if(!employee){
            return Response(res,404,"Employee not found")
          }
          if(employee.role !== "employee"){
            return Response(res,403,"You are not authorized")
          }  
          const leave = await Leave.findById(leaveId)
          if(!leave){
            return Response(res,200,"No leave details")
          }
          return Response(res,200,"Leave details",{leave})
      } catch (error) {
        console.error("failed to get leave details",error)
        return Response(res,500,"Internal server error")
      }
}
export const EmployeeLeaveDashboardStats = async(req,res)=>{
    try {
         const employeeId = req.user
        const employee = await Employee.findById(employeeId)
        if(!employee){
            return Response(res,404,"Employee not found")
        }
        if(employee.role !== "employee"){
            return Response(res,403,"You are not authorized")
        }
        const totalRequests = await Leave.countDocuments({employeeId:employee._id})
        const pendingLeaves = await Leave.countDocuments({employeeId:employee._id,status:"pending"})
        const approvedLeaves = await Leave.countDocuments({employeeId:employee._id,status:"approved"})
        const rejectedLeaves = await Leave.countDocuments({employeeId:employee._id,status:"rejected"})
        return Response(res,200,"Leave Dashboard Stats",{totalRequests,pendingLeaves,approvedLeaves,rejectedLeaves})
        
    } catch (error) {
         console.error("failed to get employee leave dashboard stats",error)
        return Response(res,500,"Internal server error")
        
    }
}
export const ApprovedAndRejectLeave = async(req,res)=>{
      try {
        const hrId = req.user 
        const {leaveId, status, rejectedReason} = req.body
        // Validate required fields
        if(!leaveId || !status){
            return Response(res,400,"Leave ID and status are required")
        }
        if(!["approved", "rejected"].includes(status)){
            return Response(res,400,"Status must be either 'approved' or 'rejected'")
        }
         const hr = await HrModel.findById(hrId);
         if (!hr || hr.role !== "hr") {
          return Response(res, 403, "Unauthorized HR");
        }
        // Find leave record
        const leave = await Leave.findById(leaveId)
        if(!leave){
            return Response(res,404,"Leave not found")
        }
        if(leave.status !== "pending"){
            return Response(res,400,"This leave has already been processed")
        }
        // Handle Approval
        if(status === "approved"){
            leave.status = "approved"
            leave.approvedBy = hrId
            leave.rejectedBy = null
            leave.rejectedReason = null
        }
        // Handle Rejection
        if(status === "rejected"){
            if(!rejectedReason){
                return Response(res,400,"Rejected reason is required")
            }
            if(rejectedReason.length > 400){
                return Response(res,400,"Rejection reason must not exceed 400 characters")
            }
            leave.status = "rejected"
            leave.rejectedReason = rejectedReason
            leave.rejectedBy = hrId
            leave.approvedBy = null   
        }
        await leave.save();
       const populatedLeave = await Leave.findById(leaveId).populate("approvedBy", "name email").populate("rejectedBy", "name email");
        return Response(res, 200, `Leave ${status} successfully`, populatedLeave)
      } catch (error) {
        console.error("Failed to process leave:",error.message)
        return Response(res,500,"Internal server error")
      }
}
export const GetAllEmployeeLeaves = async(req,res)=>{
     try {
         const hrId = req.user 
         let {page = 1,limit = 5} = req.query
         page = parseInt(page)
         limit = parseInt(limit)
         const skip = (page - 1) * limit
         const hr = await HrModel.findById(hrId)
         if(!hr){
            return Response(res,404,"Hr not found")
         }
         if(hr.role !== "hr"){
            return Response(res,403,"You are not authorized")
         }
         const companyId = hr.companyId
         const company = await CompanyModel.findById(companyId)
         if(!company){
            return Response(res,404,"Company not found")
         }
         const leaves = await Leave.find({companyId:company._id}).populate("employeeId","name email profilepic").populate("approvedBy","name").populate("rejectedBy","name").skip(skip).limit(limit).sort({createdAt:-1}).lean()
         const totalLeaves = await Leave.countDocuments({companyId:company._id})
         const totalPages = Math.ceil(totalLeaves / limit)
         
        if(leaves.length === 0){
            return response(res,200,"No leaves found",[])
        }
        return Response(res,200,"Leaves found",{leaves,pagination:{
            currentPage:page,
            totalPages,
            totalLeaves,
            limit:limit
        }})        
     } catch (error) {
        console.error("failed to get all employees leaves",error)
        return Response(res,500,"Internal server error")  
     }
}
export const AllEmployeesEachLeaveDetails = async(req,res)=>{
      try {
          const hrId = req.user 
          const leaveId = req.params.id

          const hr = await HrModel.findById(hrId)
          if(!hr){
            return Response(res,404,"Hr not found")
          }
          if(hr.role !== "hr"){
            return Response(res,403,"You are not authorized")
          }  
          const leave = await Leave.findById(leaveId)
          if(!leave){
            return Response(res,200,"No leave details")
          }
          return Response(res,200,"Leave details",{leave})
      } catch (error) {
        console.error("failed to get leave details",error)
        return Response(res,500,"Internal server error")
      }
}
export const HrLeaveDashboardStats = async(req,res)=>{
    try {
        const hrId = req.user
        const hr = await HrModel.findById(hrId)
        if(!hr){
            return Response(res,404,"Hr not found")
        }
          if(hr.role !== "hr"){
            return Response(res,403,"You are not authorized")
        }
        const companyId = hr.companyId
        const company = await CompanyModel.findById(companyId)
         if(!company){
            return Response(res,404,"Company not found")
        }
        const totalRequests = await Leave.countDocuments({companyId:company._id})
        const pendingLeaves = await Leave.countDocuments({companyId:company._id,status:"pending"})
        const approvedLeaves = await Leave.countDocuments({companyId:company._id,status:"approved"})
        const rejectedLeaves = await Leave.countDocuments({companyId:company._id,status:"rejected"})
        return Response(res,200,"Leave Dashboard Stats",{totalRequests,pendingLeaves,approvedLeaves,rejectedLeaves})
    } catch (error) {
          console.error("failed to get hr leave dashboard stats",error)
        return Response(res,500,"Internal server error")
    }
}










