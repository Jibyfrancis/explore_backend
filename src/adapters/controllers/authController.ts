import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import { UserDbInterface } from "../../application/repositories/userDbRepository"
import { UserRepositoryMongoDB } from "../../frameworks/database/repositories/userRepositoryMongodb"
import { AuthService } from "../../frameworks/services/authServices"
import { AuthServiceInterface } from "../../application/services/authserviceInterface"
import { userRegister,userLogin,userGoogleLogin } from "../../application/useCases/auth/userAuth"
import { request } from "http"




const authController = (
    userDbrepository: UserDbInterface,
    userDbRepositoryImpl: UserRepositoryMongoDB,
    authserviceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
) => {
    const dbRepositoryUser = userDbrepository(userDbRepositoryImpl())
    const authService = authserviceInterface(authServiceImpl())

    const registerUser = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const user: { userName: string, email: string, password: string , mobile: string} = req.body
        console.log(user);
        
        const token = await userRegister(user, dbRepositoryUser, authService)
        res.json({
            status: "success",
            message: "user registerd",
            token,
        })

    })
    const loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { email, password }: { email: string, password: string } = req.body
        const data =await userLogin(email,password,dbRepositoryUser,authService)
        res.json({
            status: "success",
            message: "user",
            data,

        })

    }) 

    const googleLoginUser=asyncHandler(async(req:Request,res:Response)=>{
        // console.log(req.body);
        
        const user:{ userName: string, email: string,photoUrl:string,isGoogleUser:boolean }={
            userName:req.body.name,
            email:req.body.email,
            photoUrl:req.body.photoUrl,
            isGoogleUser:true
        }
        console.log(user);
        
        const token = await userGoogleLogin (user,dbRepositoryUser,authService)
        res.json({
            status: "success",
            message: "google user registerd",
            token,

        })
       
        

    })



    return {
        registerUser,
        loginUser,
        googleLoginUser,
        // numberSignupUser
    }

}
export default authController