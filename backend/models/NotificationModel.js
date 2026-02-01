import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyModel",required:true} ,
    receiverId:{type:mongoose.Schema.Types.ObjectId,required:true},
    receiverRole:{type:String,enum:["hr","employee"],required:true},
    title:{type:String,required:true},
    message:{type:String,},
    type:{type:String,enum:["announcement","leave","attendance","system"]},
    isRead:{type:Boolean,default:false}
},{timestamps:true})

export const Notification = mongoose.model("Notification",notificationSchema)
