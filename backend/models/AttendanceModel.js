import mongoose from "mongoose"

const AttendanceSchema = new mongoose.Schema({
     employeeId:{type:mongoose.Schema.Types.ObjectId,ref:"Employee",required:true},
     companyId:{type:mongoose.Schema.Types.ObjectId,ref:"CompanyModel",required:true},
     clockedIn:{type:Date,default:null},
     clockedOut:{type:Date,default:null},
     date:{type:Date,required:true},
     status:{type:String,enum:["present","absent","halfday"],default:"present"},
     totalWorkingMinutes:{type:Number,default:0}
},{timestamps:true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
AttendanceSchema.virtual("totalWorkingTime").get(function () {
  const minutes = this.totalWorkingMinutes || 0;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
});
// Prevent duplicate attendance for same day
AttendanceSchema.index({employeeId:1,date:1},{unique:true})
export const Attendance = mongoose.model("Attendance",AttendanceSchema)


