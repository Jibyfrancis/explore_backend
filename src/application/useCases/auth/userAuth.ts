import { HttpStatus } from "../../../type/httpStatus";
import { UserInterface } from "../../../type/userInterface";
import AppError from "../../../utils/appErrors";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { AuthServiceInterface } from "../../services/authserviceInterface";
import { CreateUserInterface, CreateGoogleUserInterface } from "../../../type/userInterface";


export const userRegister = async (user: CreateUserInterface,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    const existUser = await userRepository.findUserByEmail(user.email)
    if (existUser) {
        const token = authService.generateToken(existUser.toString())
        return token

    }else{

        user.password = await authService.encryptPassword(user.password)
        const { _id: userId } = await userRepository.addUser(user)
        const token = authService.generateToken(userId.toString())
        
        return token
    }

}

export const userLogin = async (email: string, password: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>) => {
    const user: UserInterface | null = await userRepository.findUserByEmail(email)
    if (!user) {
        throw new AppError("user does not exist", HttpStatus.UNAUTHORIZED)
    }

    const isPasswordIncorrect = await authService.comparePassword(password, user.password)
    if (!isPasswordIncorrect) {
        throw new AppError("password incorrect", HttpStatus.UNAUTHORIZED)

    }
    if (user.isGoogleUser) {
        throw new AppError("please login with google", HttpStatus.UNAUTHORIZED)
    }
    const token = authService.generateToken(user._id.toString())
    console.log(token);

    return {
        token,
        user
    }

}

export const userGoogleLogin = (async (user: CreateGoogleUserInterface,
    userRepository: ReturnType<UserDbInterface>, authService: ReturnType<AuthServiceInterface>) => {
    const isGoogleUser = await userRepository.findUserByEmail(user.email)
    if (isGoogleUser) {
        const token = authService.generateToken(isGoogleUser._id.toString())
        console.log(token);

        return {
            token,
            message: 'user exist'
        }

    } else {

        const { _id: userId } = await userRepository.addGoogleUser(user)
        const token = authService.generateToken(userId.toString())
        return token
    }

})

