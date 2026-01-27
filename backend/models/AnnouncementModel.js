import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyModel",required:true},
    hrId:{type:mongoose.Schema.Types.ObjectId,ref:"HrModel",required:true},
    category:{type:String,enum:["corporate","event","hrupdate"],required:true},
    title:{type:String,required:true,maxlength:200},
    content:{type:String,required:true,maxlength:400}
},{timestamps:true})

export const Announcement = mongoose.model("Announcement",AnnouncementSchema)

