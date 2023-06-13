import { Request,Response,NextFunction } from "express";
import AppError from "../../../utils/appErrors";
import { authServices } from "../../services/authServices";
import { HttpStatus } from "../../../type/httpStatus";

const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    
    let token:string=""
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1]
    }
    if(token==""){
        throw new AppError('Token not found',HttpStatus.UNAUTHORIZED)
    }
    try{
        authServices().verifyToken(token)
        next()
    }catch(err){
        throw new AppError('Unauthorized',HttpStatus.UNAUTHORIZED)
    }

    

}
export default authMiddleware