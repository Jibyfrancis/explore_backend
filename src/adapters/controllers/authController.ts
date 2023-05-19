import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/repositories/userRepositoryMongodb";
import { AuthService } from "../../frameworks/services/authServices";
import { AuthServiceInterface } from "../../application/services/authserviceInterface";
import {
  userRegister,
  userLogin,
  userGoogleLogin,
} from "../../application/useCases/auth/userAuth";
import { AdminRepositoryMongoDB } from "../../frameworks/database/repositories/adminRerpositoryMongoDB";
import { AdminDbInterface } from "../../application/repositories/adminDbRepository";
import { adminLogin } from "../../application/useCases/auth/adminAuth";

const authController = (
  userDbrepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  authserviceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  adminDbReopsitory: AdminDbInterface,
  adminrepositoryImpl: AdminRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbrepository(userDbRepositoryImpl());
  const dbRepositoryAdmin = adminDbReopsitory(adminrepositoryImpl());
  const authService = authserviceInterface(authServiceImpl());

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user: {
      userName: string;
      email: string;
      password: string;
      mobile: string;
    } = req.body;

    const data = await userRegister(user, dbRepositoryUser, authService);
    res.json({
      status: "success",
      message: "user registerd",
      data,
    });
  });

  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const data = await userLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "user",
      data,
    });
  });

  const googleLoginUser = asyncHandler(async (req: Request, res: Response) => {
    const user: {
      userName: string;
      email: string;
      photoUrl: string;
      isGoogleUser: boolean;
    } = {
      userName: req.body.name,
      email: req.body.email,
      photoUrl: req.body.photoUrl,
      isGoogleUser: true,
    };
    const data = await userGoogleLogin(user, dbRepositoryUser, authService);
    res.json({
      status: "success",
      data,
    });
  });

  const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    
    const { userName, password } = {
      userName: req.body.userName,
      password: req.body.password,
    };

    const data = await adminLogin(
      userName,
      password,
      dbRepositoryAdmin,
      authService
    );
    console.log(data);
    res.json({
        status:"success",
        data
    })
    
  });

  return {
    registerUser,
    loginUser,
    googleLoginUser,
    loginAdmin,
    // numberSignupUser
  };
};
export default authController;
