import { HttpStatus } from "../../../type/httpStatus";
import AppError from "../../../utils/appErrors";
import { AdminInterface } from "../../../type/adminInterface";
import { AdminDbInterface } from "../../repositories/adminDbRepository";
import { AuthServiceInterface } from "../../services/authserviceInterface";

export const adminLogin = async (
  userName: string,
  password: string,
  adminRepository: ReturnType<AdminDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const admin: AdminInterface |null = await adminRepository.adminLogin(
    userName
  );
  if(!admin){
    throw new AppError('username is not valid',HttpStatus.UNAUTHORIZED)
  }
  const isPasswordIncorrect = await authService.comparePassword(
    password,
    admin.password
  );
  const token = authService.generateToken(admin._id.toString());

  return {
    admin,
    token
  };
};
