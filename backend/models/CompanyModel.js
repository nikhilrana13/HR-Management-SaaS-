import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name:{type:String,required:true},
    hrId:{type:mongoose.Schema.Types.ObjectId,ref:"HrModel",required:true},
    departments:[{type:mongoose.Schema.Types.ObjectId,ref:"Department"}],
    address:{type:String,default:""},
    phoneNumber:{type:String,default:""},
    plan:{type:String,enum:["free,pro"],default:"free"},
    employeeLimit:{type:Number,default:5},
    isActive:{type:boolean,defualt:false},
    announcements:[{type:mongoose.Schema.Types.ObjectId,ref:"Announcement"}]
},{timestamps:true})

export const CompanyModel = mongoose.model("CompanyModel",CompanySchema)




