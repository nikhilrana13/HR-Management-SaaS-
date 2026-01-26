import cron from "node-cron"
import moment from "moment-timezone"
import { Employee } from "../models/EmployeeModel.js"
import { Attendance } from "../models/AttendanceModel.js"


// runs at every day 11:00 am
export const MarkedAutoAbsent = ()=>{
    cron.schedule("0 11 * * *", async()=>{
    console.log("runs auto marked absent")
     try {
    const today = moment.tz("Asia/Kolkata").startOf("day").toDate()
     const employees = await Employee.find({isActive:true})

     for(const emp of employees){
        const attendance = await Attendance.findOne({
            employeeId:emp._id,
            date:today
        })
        if(!attendance){
            await Attendance.create({
                employeeId:emp._id,
                companyId:emp.companyId,
                date:today,
                status:"absent"
            })
        }
        console.log(`Auto marked absent ${emp._id}`)
     }    
     } catch (error) {
        console.error("failed to mark auto absent",error)
     }
    })
}



