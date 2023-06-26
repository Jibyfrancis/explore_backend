import hostEntity from "../../../../entity/host";
import { HostInterface } from "../../../type/hostInterface";
import { HttpStatus } from "../../../type/httpStatus";
import AppError from "../../../utils/appErrors";
import { Types } from "mongoose";
import { HostDbInterface } from "../../repositories/hostDbRepository";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { CreatePropertyInterface } from "../../../type/createPropertyInterface";
import createPropertyEntity from "../../../../entity/property";
import orderEntity from "../../../../entity/order";
import { OrderInterface } from "../../../type/orderInterface";
import { ConfirmOrderInterface } from "../../../type/confirmOrderInterface";


export const hostRegister = async (
  host: HostInterface,
  hostRepository: ReturnType<HostDbInterface>
) => {
  const newHost = hostEntity(host);
  const hostData = await hostRepository.addHost(newHost);
  return hostData;
};

export const getUserById = async (
  id: Types.ObjectId,
  userRepository: ReturnType<UserDbInterface>
) => {
  const user = await userRepository.findUserById(id);
  return user;
};

export const createPropery = async (
  property: CreatePropertyInterface,
  userRepository: ReturnType<UserDbInterface>
) => {
  const newProperty = createPropertyEntity(property);
  const propertyData = await userRepository.addProperty(newProperty);
  return propertyData;
};
export const getPropertyByUserId = async (id: Types.ObjectId, userRepository: ReturnType<UserDbInterface>) => {
  const property = await userRepository.findPropertybyUserId(id)
  return property

}
export const getAllProperty = async (
  userRepository: ReturnType<UserDbInterface>
) => {
  const property = await userRepository.findAllProperty()
  return property
}
export const getPropertyById = async (
  id: Types.ObjectId,
  userRepository: ReturnType<UserDbInterface>
) => {
  const property = await userRepository.findPropertyById(id)
  return property
}
export const createOrder = async (data: OrderInterface, userRepository: ReturnType<UserDbInterface>) => {
const newOrder=orderEntity(data)
const orderdata=await userRepository.createNewOrder(newOrder)
return orderdata

}

export const confirmNewOrder=async(data:ConfirmOrderInterface,userRepository:ReturnType<UserDbInterface>,req:Express.Request)=>{
  const sessionVerifyId = req.session.verifyid
  console.log('sessionid:'+sessionVerifyId);
  console.log('data:'+data.paymentId);
  
  
  if(data.paymentId===sessionVerifyId){
    const confirmOrderData=await userRepository.orderConfirm(data)
    return confirmOrderData
  }
  else{
    throw new AppError("paymentId is not matched", HttpStatus.UNAUTHORIZED);
  }
}

export const getAllBooking=async (userRepository:ReturnType<UserDbInterface>)=>{
  const bookings= await userRepository.getAllBooking()
  return bookings
}
export const cancelBooking=async(id:Types.ObjectId,userRepository:ReturnType<UserDbInterface>)=>{
  return await userRepository.bookingCancel(id)
}