import { response } from "express";
import { Attendance } from "../models/AttendanceModel.js";
import { CompanyModel } from "../models/CompanyModel.js";
import { Employee } from "../models/EmployeeModel.js";
import { HrModel } from "../models/HrModel.js";
import { Response } from "../utils/ResponseHandler.js";
import moment from "moment-timezone";

export const AttendanceCheckIn = async (req, res) => {
  try {
    const employeeId = req.user;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return Response(res, 404, "Employee not found");
    }
    if (employee.role !== "employee") {
      return Response(res, 403, "You are not authorized");
    }
   //  Ist current time 
   const nowIst = moment().tz("Asia/Kolkata")
  //  // block check in after 11:00 am
   if(nowIst.hour() >= 11){
      return Response(res,403,"Check-in time expired. You are marked absent for today")
   }
  //   //  IST start of day
    const todayIst = moment().tz("Asia/Kolkata").startOf("day").toDate();
    //  already checked in today
    const alreadyMarked = await Attendance.findOne({
      employeeId: employeeId,
      date: todayIst,
    });
    if (alreadyMarked) {
      return Response(res, 400, "Already Checked in today");
    }
   const attendance =  await Attendance.create({
      employeeId,
      companyId: employee.companyId,
      date: todayIst,
      clockedIn: new Date(),
    });
    const clockedIn = attendance.clockedIn
    return Response(res, 201, "Clock-in marked successfully",{clockedIn});
  } catch (error) {
    console.log("failed to marked clocked in", error);
    return Response(res, 500, "Internal server error");
  }
};
export const AttendanceCheckOut = async (req, res) => {
  try {
    const employeeId = req.user;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return Response(res, 404, "Employee not found");
    }
    if (employee.role !== "employee") {
      return Response(res, 403, "You are not authorized");
    }
    //  IST start of day
    const todayIst = moment().tz("Asia/Kolkata").startOf("day").toDate();
    const attendance = await Attendance.findOne({
      employeeId,
      date: todayIst,
    });
    // No check-in found
    if (!attendance) {
      return Response(res, 400, "You have not checked in today");
    }

    if (attendance.clockedOut) {
      return Response(res, 400, "You check out already");
    }
    const clockedOutTime = new Date();
    attendance.clockedOut = clockedOutTime;
    // total working minutes  
    attendance.totalWorkingMinutes = Math.floor(
      (clockedOutTime - attendance.clockedIn) / (1000 * 60),
    );
    // current ist time 
    const nowIst = moment().tz("Asia/Kolkata")
    // halfday rule : checkout before 2 pm  
    if(nowIst.hour() < 14){
        attendance.status = "halfday"
    }else{
      attendance.status = "present"
    }
    await attendance.save();
    return Response(res, 201, "Clock-Out marked successfully", {
      totalWorkingMinutes: attendance.totalWorkingMinutes,
    });
  } catch (error) {
    console.log("failed to marked clocked in", error);
    return Response(res, 500, "Internal server error");
  }
};


export const EachEmployeeMonthAttendance = async (req, res) => {
  try {
    const employeeId = req.user;
    const currentYear = moment().tz("Asia/Kolkata").year()
    const currentMonth = moment().tz("Asia/Kolkata").month() + 1
    const { year=currentYear, month=currentMonth, page = 1, limit = 6 } = req.query;
    // if (!year || !month) {
    //   return Response(res, 400, "Year and month is required");
    // }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return Response(res, 404, "Employee not found");
    }
    const skip = (page - 1) * limit;
    // Ist start & end of month
    const startDate = moment
      .tz({ year, month: month - 1, day: 1 }, "Asia/Kolkata")
      .startOf("month")
      .toDate();
    const endDate = moment
      .tz({ year, month: month - 1, day: 1 }, "Asia/Kolkata")
      .endOf("month")
      .toDate();
    let attendance = [];
    let totalCount = 0;
    try {
      attendance = await Attendance.find({
        employeeId,
        date: { $gte: startDate, $lte: endDate },
      }).sort({ date: 1 }).skip(skip).limit(limit).sort({date:-1})
    } catch (error) {
      console.log("Attendance fetch failed", error);
    }
    try {
      totalCount = await Attendance.countDocuments({
        employeeId,
        date: { $gte: startDate, $lte: endDate },
      });
    } catch (error) {
      console.log("Attendance count failed", error);
    }
    const totalPages = Math.ceil(totalCount / limit);
    return Response(res, 200, "attendance found", {
      attendance,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalRecords: totalCount,
        perPage: limit,
      },
    });
  } catch (error) {
    console.log("failed to get attendance", error);
    return Response(res, 500, "Internal server error");
  }
};
export const EachEmployeeAttendanceStats = async(req,res)=>{
   try {
       const employeeId = req.user 
       const employee = await Employee.findById(employeeId)
       if(!employee){
          return Response(res,404,"Employee not found")
       }
       if(employee.role !== "employee"){
         return Response(res,403,"You are not authorized")
       }
      // show today attendance 
       const startDate = moment.tz("Asia/Kolkata").startOf("day").toDate()
       const endDate =  moment.tz("Asia/Kolkata").endOf("day").toDate()

       const attendance = await Attendance.findOne({employeeId:employee._id,date:{$gte:startDate,$lte:endDate}}) 
       if(attendance.length === 0){
         return Response(res,200,"No Attendance found",[])
       }
       return  Response(res,200,"Attendance found",{attendance})     
   } catch (error) {
      console.log('failed to get attendance',error)
      return Response(res,500,"Internal server error")
   }   
}
export const AttendanceDashboardStats = async (req, res) => {
  try {
    const hrId = req.user;
    const {date} = req.query;
   
    const Hr = await HrModel.findById(hrId);
    if (!Hr) {
      return Response(res, 404, "Hr not found");
    }
    if (Hr.role !== "hr") {
      return Response(res, 403, "You are not authorized");
    }
    let startDate,endDate 
    if(date){
       startDate = moment.tz(date,"Asia/Kolkata").startOf("day").toDate()
       endDate = moment.tz(date,"Asia/Kolkata").endOf("day").toDate()
    }else{
      // default today 
      startDate = moment.tz("Asia/Kolkata").startOf("day").toDate()
      endDate = moment.tz("Asia/Kolkata").endOf("day").toDate()
    }
    const company = await CompanyModel.findOne({ hrId });
    if (!company) {
      return Response(res, 404, "Company not found");
    }
    const totalEmployees = await Employee.countDocuments({companyId:company._id})
    // fetch all attendance of month
    const attendances = await Attendance.find({
      companyId: company._id,
      date: { $gte: startDate, $lte: endDate },
    }).select("date status");

    let present = 0;
    let absent = 0;
    let halfday = 0

    attendances.forEach((att)=>{
      if(att.status === "present") present += 1;
      if(att.status === "absent")  absent += 1;
      if(att.status === "halfday") halfday += 1;
    })
    return Response(res, 200, "Attendance stats found", {date:moment(startDate).format("YYYY-MM-DD"),present,absent,halfday,totalEmployees});
  } catch (error) {
    console.log("failed to get attendance stats", error);
    return Response(res, 500, "Internal server error");
  }
};
export const AllEmployeedailyAttendanceData = async(req,res)=>{
    try {
      const hrId = req.user 
      let {date,page = 1,limit = 6,employeename,department,status} = req.query 
      page = parseInt(page)
      limit = parseInt(limit) 
      const skip = (page - 1) * limit  
      const Hr = await HrModel.findById(hrId)
      if(!Hr){
          return Response(res,404,"Hr not found")
      }
      if(Hr.role !== "hr"){
         return Response(res,404,"You are not authorized")
      }  
      const company = await CompanyModel.findOne({hrId})
      if(!company){
         return Response(res,404,"Company not found")
      } 
     // IST Date
      const startDate = date ? moment.tz(date, "Asia/Kolkata").startOf("day").toDate() : moment.tz("Asia/Kolkata").startOf("day").toDate();
     const endDate = date ? moment.tz(date, "Asia/Kolkata").endOf("day").toDate() : moment.tz("Asia/Kolkata").endOf("day").toDate()
     //filters 
     let filters = {
      companyId: company._id,
      date:{$gte:startDate,$lte:endDate}
     }   
     if(status){
      filters.status = status 
     }
    // employee filter
    let employeeFilter = {}
    if(employeename){
      employeeFilter.name = {$regex: employeename,$options:"i"}
    }  
    if(department && department !== "all"){
      employeeFilter.department = department
    } 
    let employeeIds = [];
    if(Object.keys(employeeFilter).length > 0){
       const employees = await Employee.find(
         {companyId: company._id, ...employeeFilter},"_id"
       )
       employeeIds = employees.map((e)=>e._id)
       filters.employeeId = {$in: employeeIds}
    } 
   const attendances = await Attendance.find(filters).populate("employeeId","name department departmentId profilepic").select("date status clockedIn clockedOut totalWorkingMinutes").sort({createdAt:1}).skip(skip).limit(limit)

   const totalemployeesAttendance = await Attendance.countDocuments(filters)
   const totalPages = Math.ceil(totalemployeesAttendance / limit)
   if(attendances.length === 0){
         return Response(res,200,"No Attendances found",[])
   }
   return Response(res,200,"Attendance found",{attendances,pagination:{
          totalPages,
          totalemployeesAttendance,
          currentPage: page,
          limit: limit
   }}) 

   } catch (error) {
      console.error("failed to get employee attendances",error)
      return Response(res,500,"Internal server error")
    }
}; 














































