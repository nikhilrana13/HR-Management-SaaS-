import { Response } from "../utils/ResponseHandler.js"
import jwt from "jsonwebtoken"




export const AuthMiddleware = (req,res,next)=>{
        const authHeader = req.headers.authorization 
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return Response(res,401,"Unauthorized: token missing")
        }
        try {
             const token = authHeader.split(" ")[1];
             const decoded = jwt.verify(token,process.env.JWT_SECRET)
             req.user = decoded.id 
             req.role = decoded.role
             next()
        } catch (error) {
            console.error("error in Auth middleware",error)
            return Response(res,500,"Internal server error")
        }
}
