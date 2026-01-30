import { CompanyModel } from "../models/CompanyModel.js";
import { Department } from "../models/DepartmentModel.js";
import { HrModel } from "../models/HrModel.js";
import { Response } from "../utils/ResponseHandler.js";



export const CreateDepartment = async(req,res)=>{
    try {
        const hrId = req.user 
        const {name} = req.body
        if(!name || !name.trim()){
            return Response(res,400,"Department name is Required")
        }
        const normalizedName = name.trim().toLowerCase()
        const Hr = await HrModel.findById(hrId);
        if (!Hr) {
              return Response(res, 404, "Hr not found");
        }
        if (Hr.role !== "hr") {
              return Response(res, 403, "You are not authorized");
        }
        const company = await CompanyModel.findOne({ hrId });
            if (!company) {
              return Response(res, 404, "Company not found");
        }
        const existingDept = await Department.findOne({
            companyId:company._id,
            name:normalizedName
        })
        if(existingDept){
            return Response(res,409,"Department already exists")
        }
        const department = await Department.create({
            companyId:company._id,
            name:normalizedName
        })
        company.departments.push(department._id)
        await company.save()
        return Response(res,201,"Department created successfully")
    } catch (error) {
        console.error("failed to create department",error)
        return Response(res,500,"Internal server error")
    }
}

export const UpdateDepartment = async(req,res)=>{ 
    try {
    const hrId = req.user;
    const departmentId = req.params.id;
    const { name } = req.body;
    // validation
    if (!name || !name.trim()) {
      return Response(res, 400, "Department name is required");
    }
    const normalizedName = name.trim().toLowerCase()
    // HR check
    const Hr = await HrModel.findById(hrId);
    if (!Hr) {
      return Response(res, 404, "Hr not found");
    }
    if (Hr.role !== "hr") {
      return Response(res, 403, "You are not authorized");
    }
    // find company
    const company = await CompanyModel.findOne({ hrId });
    if (!company) {
      return Response(res, 404, "Company not found");
    }
    // find department
    const department = await Department.findById(departmentId);
    if (!department) {
      return Response(res, 404, "Department not found");
    }
    // ensure department belongs to HR's company
    if (department.companyId.toString() !== company._id.toString()) {
      return Response(res, 403, "You are not authorized to update this department");
    }
    // duplicate department name check
    const existingDept = await Department.findOne({
      companyId: company._id,
      name: normalizedName,
      _id: { $ne: departmentId },
    });
    if (existingDept) {
      return Response(res, 409, "Department with this name already exists");
    }
    // update only name
    department.name = normalizedName;
    await department.save();
    return Response(res, 200, "Department updated successfully", {
      department,
    });
    } catch (error) {
       console.error("failed to update department", error);
      return Response(res, 500, "Internal server error");
    }
}

export const ToggleEnableandDisableDepartment = async(req,res)=>{
    try {
    const hrId = req.user;
    const departmentId = req.params.id;
    const { isActive } = req.body;
    // HR check
    const Hr = await HrModel.findById(hrId);
    if (!Hr) {
      return Response(res, 404, "Hr not found");
    }
    if (Hr.role !== "hr") {
      return Response(res, 403, "You are not authorized");
    }
    // find company
    const company = await CompanyModel.findOne({ hrId });
    if (!company) {
      return Response(res, 404, "Company not found");
    }
    // find department
    const department = await Department.findById(departmentId);
    if (!department) {
      return Response(res, 404, "Department not found");
    }
    // ensure department belongs to HR's company
    if (department.companyId.toString() !== company._id.toString()) {
      return Response(res, 403, "You are not authorized to update this department");
    }
    department.isActive = isActive
    await department.save();
    return Response(res, 200, `Department ${isActive ? 'enabled' :'disabled'} successfully`);
        
    } catch (error) {
        console.error("toggle department error",error)
        return Response(res,500,"Internal server error")
    }
}

export const GetAlldepartment = async(req,res)=>{
    try {
         const hrId = req.user 
          // HR check
         const Hr = await HrModel.findById(hrId);
         if (!Hr) {
           return Response(res, 404, "Hr not found");
         }
         if (Hr.role !== "hr") {
          return Response(res, 403, "You are not authorized");
         }
         // find company
        const company = await CompanyModel.findOne({ hrId });
         if (!company) {
           return Response(res, 404, "Company not found");
        }
        const dept =  await Department.find({companyId:company._id})
        if(!dept){
          return Response(res,200,"No Departments found")
        }
        return Response(res,200,"Departments found",{departments:dept})
    } catch (error) {
        console.error("failed to get departments",error)
        return Response(res,500,"Internal server error")
      
    }
}