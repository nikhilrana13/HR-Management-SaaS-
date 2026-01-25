import { Attendance } from "../models/AttendanceModel.js"
import { Employee } from "../models/EmployeeModel.js"
import { Response } from "../utils/ResponseHandler.js"
import moment from "moment-timezone"



export const AttendanceCheckIn = async(req,res)=>{
    try {
         const employeeId = req.user 
         const employee = await Employee.findById(employeeId)
         if(!employee){
            return Response(res,404,"Employee not found")
         }
         if(employee.role !== "employee"){
            return Response(res,403,"You are not authorized")
         }
         //  IST start of day
         const todayIst = moment().tz("Asia/Kolkata").startOf("day").toDate()
        //  already checked in today 
        const alreadyMarked = await Attendance.findOne({
            employeeId:employeeId,
            date:todayIst
        })
        if(alreadyMarked){
            return Response(res,400,"Already Checked in today")
        }
        await Attendance.create({
            employeeId,
            companyId:employee.companyId,
            date:todayIst,
            clockedIn: new Date()
        }) 
        return Response(res,201,"Clock-in marked successfully")
    } catch (error) {
        console.log('failed to marked clocked in',error)
        return Response(res,500,"Internal server error")
    }
}
export const AttendanceCheckOut = async(req,res)=>{
 try {
         const employeeId = req.user 
         const employee = await Employee.findById(employeeId)
         if(!employee){
            return Response(res,404,"Employee not found")
         }
         if(employee.role !== "employee"){
            return Response(res,403,"You are not authorized")
         }
         //  IST start of day
         const todayIst = moment().tz("Asia/Kolkata").startOf("day").toDate()
         const attendance = await Attendance.findOne({
            employeeId,
            date:todayIst
         })
          // No check-in found
         if(!attendance){
            return Response(res,400,"You have not checked in today")
         }
    
         if(attendance.clockedOut){
            return Response(res,400,"You check out already")
         }
         const clockedOutTime = new Date()
         attendance.clockedOut = clockedOutTime
         attendance.totalWorkingMinutes = Math.floor((clockedOutTime - attendance.clockedIn) / (1000 * 60))
         await attendance.save()
        return Response(res,201,"Clock-Out marked successfully",{totalWorkingMinutes:attendance.totalWorkingMinutes})
    } catch (error) {
        console.log('failed to marked clocked in',error)
        return Response(res,500,"Internal server error")
    }
}

export const EachEmployeeMonthAttendance = async(req,res)=>{
     try {
          const employeeId = req.user 
          const {year,month,page = 1,limit = 6} = req.query
          if(!year || !month){
            return Response(res,400,"Year and month is required")
          }
          const employee = await Employee.findById(employeeId)
          if(!employee){
            return Response(res,404,"Employee not found")
          }
          const skip = (page - 1) * limit
          // Ist start & end of month 
          const startDate = moment.tz({ year, month: month - 1, day: 1 }, "Asia/Kolkata").startOf("month").toDate();
          const endDate = moment.tz({ year, month: month - 1, day: 1 }, "Asia/Kolkata").endOf("month").toDate();
          let attendance = [];
          let totalCount = 0
          try {
               attendance = await Attendance.find({
                employeeId,
                date:{$gte:startDate,$lte:endDate}
             }).sort({date:1}).skip(skip).limit(limit)
          } catch (error) {
              console.log("Attendance fetch failed",error) 
          }
          try {
             totalCount = await Attendance.countDocuments({
                employeeId,
                date:{$gte:startDate,$lte:endDate}
             })
          } catch (error) {
             console.log("Attendance count failed",error) 
          } 
          const totalPages = Math.ceil(totalCount / limit)       
          return Response(res,200,"attendance found",{
            attendance,pagination:{
                currentPage:Number(page),
                totalPages,
                totalRecords:totalCount,
                perPage:limit
            }
          })
     } catch (error) {
         console.log('failed to get attendance',error)
        return Response(res,500,"Internal server error")
        
     }
}













