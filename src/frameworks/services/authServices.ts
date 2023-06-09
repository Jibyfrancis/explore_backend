import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import configKeys from '../../config';


export const authServices=()=>{
    const encryptPassword=async(password:string)=>{
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password
    }
    
    const comparePassword=(password:string,hashedPassword:string)=>{
        return bcrypt.compare(password,hashedPassword)

    }

    const generateToken=(payload:string)=>{
        const token = jwt.sign(payload, configKeys.jwtSecret);
        return token                            
    }
   

    

    return{
        encryptPassword,
        generateToken,
        comparePassword
    }
}
export type AuthService = typeof authServices

export type AuthServiceReturn = ReturnType<AuthService>