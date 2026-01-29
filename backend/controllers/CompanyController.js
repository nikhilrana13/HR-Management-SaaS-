import { CompanyModel } from "../models/CompanyModel.js";
import { HrModel } from "../models/HrModel.js";
import { Response } from "../utils/ResponseHandler.js";
import cloudinary from "../config/cloudinary.js";
import { validationResult } from "express-validator";

export const CreateCompany = async (req, res) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Response(res, 400, "Validation errors", errors.array());
    }
    const hrId = req.user;
    const { name, address, phoneNumber, email } = req.body;
    const Hr = await HrModel.findById(hrId);
    if (!Hr) {
      return Response(res, 404, "Hr not found");
    }
    if (Hr.role !== "hr") {
      return Response(res, 403, "You are not authorized to create company");
    }
    if (Hr.companyId) {
      return Response(res, 403, "You can Create only one company");
    }
    const company = await CompanyModel.create({
      name,
      hrId: hrId,
      address,
      phoneNumber,
      email,
      isActive: true,
    });
    Hr.companyId = company._id;
    await Hr.save();
    return Response(res, 202, "Company Created Successfully", {
      company: company,
    });
  } catch (error) {
    console.error("failed to create company", error);
    return Response(res, 500, "Internal server error");
  }
};
export const GetCompanyDetails = async (req, res) => {
  try {
    const hrId = req.user;
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
    return Response(res, 200, "Company details found", { company: company });
  } catch (error) {
    console.error("failed to get company details", error);
    return Response(res, 500, "Internal server error");
  }
};
export const UpdateCompanyDetails = async (req, res) => {
  try {
    const hrId = req.user;
    const companyId = req.params.id;
    const { name, address, phoneNumber } = req.body;
    const file = req.file;
    const Hr = await HrModel.findById(hrId);
    if (!Hr) {
      return Response(res, 404, "Hr not found");
    }
    if (Hr.role !== "hr") {
      return Response(res, 403, "You are not authorized");
    }
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return Response(res, 404, "Company not found");
    }
    if (company.hrId.toString() !== hrId) {
      return Response(res, 403, "You are not authorized to update the company");
    }
    let updateData = {};
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (file) {
      //convert to base64
      const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      // upload to cloudinary
      const cloudresponse = await cloudinary.uploader.upload(imageBase64, {
        folder: "Hr-management-saas",
        resource_type: "image",
      });
      //get secure url from cloudinary
      updateData.logo = cloudresponse.secure_url;
    }
    //if no data to update
    if (Object.keys(updateData).length === 0) {
      return Response(res, 400, "No fields provided to update");
    }
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      companyId,
      { $set: updateData },
      { new: true },
    );
    return Response(res, 200, "Company details update successfully", {
      company: updatedCompany,
    });
  } catch (error) {
    console.error("failed to update company details", error);
    return Response(res, 500, "Internal server error");
  }
};


