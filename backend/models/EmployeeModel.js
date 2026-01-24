import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyModel",required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    role:{type:String,default:"employee"},
    password:{type:String,default:null},
    position:{type:String,default:""},
    department:{type:String,required:true},
    departmentId:{type:mongoose.Schema.Types.ObjectId,ref:"Department",required:true},
    isActive:{type:Boolean,default:false},
    profilepic:{type:String,default:null},
},{timestamps:true})

export const Employee = mongoose.model("Employee",EmployeeSchema)
