import { AdminInterface } from "../../../type/adminInterface";
import Admin from "../model/adminModel";
import User from "../model/userModel";
import { UserInterface } from "../../../type/userInterface";
import { ObjectId } from "mongodb";
import { HostInterface } from "../../../type/hostInterface";
import Host from "../model/hostModel";
import Amenity from "../model/amenityModel";
import { AmenityInterface } from "../../../type/amenityInterface";
import PropertyType from "../model/propertyTypeModel";
import { PropertyTypeInterface } from "../../../type/propertyTypeInterface";

export const adminRepositoryMongoDB = () => {
  const adminLogin = async (userName: string) => {
    const admin: AdminInterface | null = await Admin.findOne({ userName });
    return admin;
  };

  const getAllusers = async () => {
    const users: Array<UserInterface> | null = await User.find();
    return users;
  };
  const changeStausUser = async (id: string, value: boolean) => {
    User.updateOne({ _id: new ObjectId(id) }, [
      { $set: { isBlocked: { $not: "$isBlocked" } } },
    ])
  };
  const getAllHostRequest = async () => {
    const hosts: Array<HostInterface> | null = await Host.find({
      approved: false,
    });
    return hosts;
  };

  const hostRequestApprove = async (id: string) => {
    return User.updateOne({ _id: new ObjectId(id) }, [
      { $set: { isHosted: { $not: "$isHosted" } } },
    ]).then(() => {
      Host.updateOne(
        { userId: new ObjectId(id) },

        [{ $set: { approved: { $not: "$approved" } } }]
      ).then((res) => {
        console.log(res);
      });
    });
  };

  const createAmenity = async (amenity: any) => {
    const newAmenity = new Amenity({
      name: amenity.getName(),
      imageUrl: amenity.getImageUrl(),
    });
    return await Amenity.create(newAmenity);
  };

  const getAllAmenity = async () => {
    const amenities: Array<AmenityInterface> | null = await Amenity.find();
    return amenities;
  };

  const findAmenityById = async (id: string) => {
    const amenities: AmenityInterface | null = await Amenity.findOne({ _id: new ObjectId(id) });
    return amenities
  }
  const deleteAmenity = async (id: string) => {
    return Amenity.deleteOne({ _id: new ObjectId(id) })
  }

  const createPropertyType = async (propertyType: any) => {
    const newPropertyType = new PropertyType({
      name: propertyType.getName(),
      imageUrl: propertyType.getImageUrl(),
    });
    return await PropertyType.create(newPropertyType)
    
  };

  const getAllPropertyType = async () => {
    const propertyTpe: Array<PropertyTypeInterface> | null =
      await PropertyType.find();
    return propertyTpe;
  };

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
    deleteAmenity
  };
};

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;
