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
  const findPropertybyUserId = async (id: Types.ObjectId) => {
    return await repository.findPropertybyUserId(id)
  }
  const findAllProperty = async () => {
    return await repository.findAllProperty()
  }

  const findPropertyById = async (id: Types.ObjectId) => {
    return await repository.findAllPropertyById(id)
  }
  const createNewOrder = async (order: {
    getpropertyName: () => string,
    getPropertyName: () => string,
    getPropertyAddress: () => string,
    getImage: () => string,
    getAdult: () => number,
    getChildren: () => number,
    getCheckIn: () => string,
    getCheckOut: () => string,
    getTotalPrice: () => number,
    getPaymentId: () => string

  }) => {
    return await repository.addOrder(order)
  }

  const orderConfirm=async (data:any)=>{
    return await repository.conformOrde(data)
  }
  const getAllBooking=async ()=>{
    return await repository.findAllBooking()
  }
  const bookingCancel=async(id:Types.ObjectId)=>{
    return await repository.cancelBooking(id)
  }
  const searchingProperty=async(data:any)=>{
    return await repository.searchProperty(data)
  }
  const deleteProperty=async(id:Types.ObjectId)=>{
    return await repository.deletePropertyById(id)
  }

  return {
    addUser,
    findUserByEmail,
    addGoogleUser,
    findUserById,
    addProperty,
    findPropertybyUserId,
    findAllProperty,
    findPropertyById,
    createNewOrder,
    orderConfirm,
    getAllBooking,
    bookingCancel,
    searchingProperty,
    deleteProperty
  }
};
export type UserDbInterface = typeof userDbrepository;
