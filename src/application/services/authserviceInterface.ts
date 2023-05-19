import { AuthServiceReturn } from "../../frameworks/services/authServices";

export const authServiceInterface = (service: AuthServiceReturn) => {
    
    const encryptPassword = (password: string) => service.encryptPassword(password);

    const generateToken = (payload: string) => {
        console.log(payload);
        return service.generateToken(payload)
    };

    const comparePassword = (password: string, hashedPassword: string) => service.comparePassword(password, hashedPassword)

    const verifyToken=(token:string)=>{
        return service.verifyToken(token)
    }
    
    return {
        encryptPassword,
        generateToken,
        comparePassword,
        verifyToken
    };
}

export type AuthServiceInterface = typeof authServiceInterface