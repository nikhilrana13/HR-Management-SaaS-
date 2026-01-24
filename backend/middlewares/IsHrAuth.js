import { Response } from "../utils/ResponseHandler.js"


export const IsHrAuth = (req,res,next)=>{
    if(req.role !== "hr"){
        return Response(res,403,"Access denied: Hr Only")
    }
    next()
}
