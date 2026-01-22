import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyModel",required:true},
    name:{type:String,required:true},
    employees:[{type:mongoose.Schema.Types.ObjectId,ref:"Employee"}],
    isActive:{type:Boolean,default:true}
},{timestamps:true})

export const Department = mongoose.model("Department",DepartmentSchema)


