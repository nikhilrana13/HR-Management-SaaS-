import { Employee } from "../models/EmployeeModel.js"
import { HrModel } from "../models/HrModel.js"
import { Notification } from "../models/NotificationModel.js"
import { Response } from "../utils/ResponseHandler.js"


export const fetchAllNotifications = async(req,res)=>{
    try {
        const userId = req.user 
        const role = req.role
        // Validate user exists
        const userModel = role === "employee" ? Employee : HrModel
        const user = await userModel.findById(userId)
        
        if(!user){
            return Response(res,404,`${role === "employee" ? "Employee" : "Hr"} not found`)
        }
        const notifications = await Notification.find({
            companyId:user.companyId,$or:[
                {receiverId:user._id},
                {receiverRole:"company"}
            ]
        }).sort({createdAt:-1})
        return Response(res,200,"Notifications found", notifications)
    } catch (error) {
        console.error("failed to get notifications", error)
        return Response(res,500,"Internal server error")
    }
} 

export const MarkReadNotifications = async(req,res)=>{
   try {
       const userId = req.user
       const role = req.role
      let companyId;
       if(role === "employee"){
          const employee = await Employee.findById(userId)
          if(!employee){
            return Response(res,404,"Employee not found")
          }
           companyId = employee.companyId
       }
       if(role === "hr"){
        const hr = await HrModel.findById(userId)
          if(!hr){
            return Response(res,404,"hr not found")
          }
           companyId = hr.companyId
       }
       await Notification.updateMany(
        {isRead:false,$or:[{receiverId:userId,receiverRole:role},{receiverId:companyId,receiverRole:"company"}]},{$set:{isRead:true}}
      )
       return Response(res,200,"All Notifications marked as read")
   } catch (error) {
      console.log("failed to marked notifications",error)
      return Response(res,500,"Internal server error")
   }
} 















