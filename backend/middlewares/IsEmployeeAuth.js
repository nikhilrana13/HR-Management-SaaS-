import { Response } from "../utils/ResponseHandler.js"

export const IsEmployeeAuth = (req,res,next)=>{
    if(req.role !== "employee"){
        return Response(res,403,"Access denied: Employee Only")
    }
    next()
}
