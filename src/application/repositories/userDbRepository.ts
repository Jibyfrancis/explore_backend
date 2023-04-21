import { UserRepositoryMongoDB } from "../../frameworks/database/repositories/userRepositoryMongodb";

export const userDbrepository = (repository: ReturnType<UserRepositoryMongoDB>) => {

    const addUser = async (user:{userName:string,email:string,password:string,mobile:string})=> {
        return await repository.addUser(user)
    }

    const findUserByEmail=async(email:string)=>{
       return await repository.findUserByEmail(email)

    }

    const findUserById=async(id:string)=>{
        return await repository.findUserById(id)
    }

    const addGoogleUser=async(user:{userName:string,email:string,photoUrl:string,isGoogleUser:boolean})=>{
           return await repository.addGoogleUser(user) 
     
    }

    return {
        addUser,
        findUserByEmail,
        addGoogleUser,
        // findUserById
        
    }
}
export type UserDbInterface=typeof userDbrepository
