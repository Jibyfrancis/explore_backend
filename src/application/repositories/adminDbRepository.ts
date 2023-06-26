import { AdminRepositoryMongoDB } from "../../frameworks/database/repositories/adminRerpositoryMongoDB";

export const adminDbReopsitory = (
  repository: ReturnType<AdminRepositoryMongoDB>
) => {
  const adminLogin = async (userName: string) => {
    return await repository.adminLogin(userName);
  };
  const getAllusers = async () => {
    return await repository.getAllusers();
  };
  const changeStausUser = async (id: string, value: boolean) => {
    return await repository.changeStausUser(id, value);
  };
  const getAllHostRequest = async () => {
    return await repository.getAllHostRequest();
  };

  const hostRequestApprove = async (id: string) => {
    return await repository.hostRequestApprove(id);
  };

  const createAmenity = async (amenity: {
    getName: () => any;
    getImageUrl: () => any;
  }) => {

    return await repository.createAmenity(amenity);
  };

  const getAllAmenity = async () => {
    return await repository.getAllAmenity();
  }
  
  const findAmenityById=async(id:string)=>{
    return await repository.findAmenityById(id);
  }
   const deleteAmenity=async(id:string)=>{
    return await repository.deleteAmenity(id);
   }

  const createPropertyType = async (propertyType: {
    getName: () => any;
    getImageUrl: () => any;
  }) => {

    return await repository.createPropertyType(propertyType);
  };

  const getAllPropertyType = async () => {
    return await repository.getAllPropertyType();
  }

    const findPropertyTypeById=async(id:string)=>{
    return await repository.findPropertyTypeById(id);
  }
  const deletePropertyType=async(id:string)=>{
    return await repository.deletePropertyType(id)
  }



  return {
    adminLogin,
    getAllusers,
    changeStausUser,
    getAllHostRequest,
    hostRequestApprove,
    createAmenity,
    getAllAmenity,
    createPropertyType,
    getAllPropertyType,
    findAmenityById,
    deleteAmenity,
    findPropertyTypeById,
    deletePropertyType
    
    
  };
};
export type AdminDbInterface = typeof adminDbReopsitory;
