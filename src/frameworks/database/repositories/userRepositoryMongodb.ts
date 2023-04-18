import User from "../model/userModel";
import { UserInterface } from "../../../type/userInterface";


export const userRepositoryMongoDB = () => {
    console.log('dbrepository');
    
    const addUser = async ( user:{userName:string,email:string,password:string,mobile:string} )=> {
        console.log(user);
        
        return await User.create(user)
    }

    const findUserByEmail=async (email:string)=>{ 
        const user:UserInterface|null=await User.findOne({email})
        return user
    }
    
    const addGoogleUser=async(user:{userName:string,email:string,photoUrl:string,isGoogleUser:boolean})=>{          
        
        return await User.create(user)

    }

    return {
        addUser,
        findUserByEmail,
        addGoogleUser
    };


}
export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;