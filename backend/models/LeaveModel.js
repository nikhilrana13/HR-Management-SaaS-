import mongoose from "mongoose"; 

const LeaveSchema = new mongoose.Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyModel",required:true},
    employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
    leaveType:{type:String,enum:["sick","casual","paid","unpaid"],required:true},
    title:{type:String,required:true},
    reasonforleave:{type:String,required:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    status:{type:String,enum:["pending","approved","rejected"],default:"pending"},
    approvedBy:{type:mongoose.Schema.Types.ObjectId,ref:"HrModel",default:null},
    appliedOn:{type:Date,default:Date.now},
    rejectedReason:{type:String,default:""},
    rejectedBy:{type:mongoose.Schema.Types.ObjectId,ref:"HrModel",default:null},
},{timestamps:true}) 

export const Leave = mongoose.model("Leave",LeaveSchema) 
