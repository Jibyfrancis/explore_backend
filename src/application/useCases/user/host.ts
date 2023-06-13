import hostEntity from "../../../../entity/host";
import { HostInterface } from "../../../type/hostInterface";
import { HttpStatus } from "../../../type/httpStatus";
import AppError from "../../../utils/appErrors";
import { Types } from "mongoose";
import { HostDbInterface } from "../../repositories/hostDbRepository";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { CreatePropertyInterface } from "../../../type/createPropertyInterface";
import createPropertyEntity from "../../../../entity/property";

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
export const getPropertyByUserId=async(id:Types.ObjectId,userRepository:ReturnType<UserDbInterface>)=>{
const property=await userRepository.findPropertybyUserId(id)
return property

}
export const getAllProperty=async(
  userRepository: ReturnType<UserDbInterface>
)=>{
  const property=await userRepository.findAllProperty()
  return property
}
export const getPropertyById=async(
  id:Types.ObjectId,
  userRepository: ReturnType<UserDbInterface>
)=>{
  const property=await userRepository.findPropertyById(id)
  return property
}