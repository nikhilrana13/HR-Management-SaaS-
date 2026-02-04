import { getIo } from "../config/socketService.js"
import { Announcement } from "../models/AnnouncementModel.js"
import { CompanyModel } from "../models/CompanyModel.js"
import { Employee } from "../models/EmployeeModel.js"
import { HrModel } from "../models/HrModel.js"
import { Notification } from "../models/NotificationModel.js"
import { Response } from "../utils/ResponseHandler.js"


export const CreateAnnouncement = async(req,res)=>{
    try {
         const io = getIo()
         const hrId = req.user 
         const {title,content,category} = req.body 


         if(!title || !content || !category){
            return Response(res,400,"All fields Are required")
         }
         const Hr = await HrModel.findById(hrId)
         if(!Hr){
            return Response(res,404,"Hr not found")
         }
        if (Hr.role !== "hr") {
               return Response(res, 403, "You are not authorized");
        }

        const company = await CompanyModel.findOne({hrId});
        if (!company) {
               return Response(res, 404, "Company not found");
        }
        if (company.hrId.toString() !== hrId) {
               return Response(res, 403, "You are not authorized to create announcement");
        }
        const announcement = await Announcement.create({
            companyId:company._id,
            hrId:Hr._id,
            title,
            content,
            category
        }) 
         
        // save announcement notification to db 
        await Notification.create({
            companyId:company._id,
            receiverRole:"company",
            receiverId:company._id,
            type:"announcement",
            title,
            content,
            isRead:false
        })
        // socket broadcast to all employee of company
        io.to(`company-${company._id}`).emit("notification",{
            _id:announcement._id,
            type:"announcement",
            title:announcement.title,
            content:announcement.content,
            category:announcement.category,
            createdAt:announcement.createdAt,
        })
        company.announcements.push(announcement._id)
        await company.save()
        return Response(res,200,"Announcement created successfully",announcement)
    } catch (error) {
    console.error("Failed to create announcement", error);
    return Response(res, 500, "Internal server error");
    }
} 

export const GetAllCompanyAnnouncements = async(req,res)=>{
    try {
        const userId = req.user
        const role = req.role 
        
       let companyId;
       if (role === "hr") {
      const company = await CompanyModel.findOne({ hrId: userId });
      if (!company) return Response(res, 404, "Company not found");
      companyId = company._id;
    }

    if (role === "employee") {
      const employee = await Employee.findById(userId);
      if (!employee) return Response(res, 404, "Employee not found");
      companyId = employee.companyId;
    }
    const announcements = await Announcement.find({ companyId })
      .sort({ createdAt: -1 });

    return Response(res, 200, "Announcements fetched", announcements);
    } catch (error) {
    console.error("Failed to fetch announcements", error);
    return Response(res, 500, "Internal server error");
    }
}












