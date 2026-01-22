import mongoose from "mongoose";

const HrSchema = new mongoose.Schema({
    name:{type:String,required:true},
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyModel",required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"hr"},
    isverified:{type:Boolean,default:false},
    profilepic:{type:String,default:null},
},{timestamps:true})

export const HrModel = mongoose.model("HrModel",HrSchema);

