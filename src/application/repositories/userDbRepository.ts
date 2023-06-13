import { UserRepositoryMongoDB } from "../../frameworks/database/repositories/userRepositoryMongodb";
import { Types } from "mongoose";

export const userDbrepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  // const addUser = async (user:{userName:string,email:string,password:string,mobile:string})=> {
  //     return await repository.addUser(user)
  // }
  const addUser = async (user: {
    getUserName: () => string;
    getEmail: () => string;
    getPassword: () => string;
    getMobile: () => string;
  }) => {
    return await repository.addUser(user);
  };

  const findUserByEmail = async (email: string) => {
    return await repository.findUserByEmail(email);
  };

  const findUserById = async (id: Types.ObjectId) => {
    return await repository.findUserById(id);
  };

  const addGoogleUser = async (user: {
    userName: string;
    email: string;
    photoUrl: string;
    isGoogleUser: boolean;
  }) => {
    return await repository.addGoogleUser(user);
  };

  const addProperty = async (property: {
    getName: () => string;
    getDescription: () => string;
    getRoomType: () => string;
    getLocation: () => { lat: number; long: number };
    getAddress: () => { address: string };
    getPrice: () => number;
    getGuest: () => number;
    getBedroom: () => number;
    getBathrooms: () => number;
    getKitchen: () => number;
    getBalcony: () => number;
    getAmenities: () => string[];
    getUserId: () => string;
    getImageUrl: () => string[];
  }) => {
   
    
    return await repository.addProperty(property);
  };
  const findPropertybyUserId=async(id:Types.ObjectId)=>{
    return await repository.findPropertybyUserId(id)
  }
  const findAllProperty=async()=>{
    return await repository.findAllProperty()
  }

  const findPropertyById=async(id:Types.ObjectId)=>{
    return await repository.findAllPropertyById(id)
  }

  return {
    addUser,
    findUserByEmail,
    addGoogleUser,
    findUserById,
    addProperty,
    findPropertybyUserId,
    findAllProperty,
    findPropertyById
  }
};
export type UserDbInterface = typeof userDbrepository;
