import User from "../model/userModel";
import { UserInterface } from "../../../type/userInterface";
import { Types } from "mongoose";
import Property from "../model/propertyModel";


export const userRepositoryMongoDB = () => {
  const addUser = async (user: any) => {
    const newUser = new User({
      userName: user.getUserName(),
      email: user.getEmail(),
      password: user.getPassword(),
      mobile: user.getMobile(),
    });
    return await User.create(newUser);
  };

  const findUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };

  const findUserById = async (id: Types.ObjectId) => {
    const user: UserInterface | null = await User.findById(id);
    return user
  };

  const addGoogleUser = async (user: {
    userName: string;
    email: string;
    photoUrl: string;
    isGoogleUser: boolean;
  }) => {
    return await User.create(user);
  };

  const addProperty = async (property: any) => {
    const newProperty = new Property({
      name: property.getName(),
      description: property.getDescription(),
      roomType: property.getRoomType(),
      location: property.getLocation(),
      address: property.getAddress(),
      price: property.getPrice(),
      guest: property.getGuest(),
      bedroom: property.getBedroom(),
      bathrooms: property.getBathrooms(),
      kitchen: property.getKitchen(),
      balcony: property.getBalcony(),
      amenities: property.getAmenities(),
      userId: property.getUserId(),
      imageUrl: property.getImageUrl()
    })

    return await Property.create(newProperty)
   
  }
  const findPropertybyUserId=async(id:Types.ObjectId)=>{
    return await Property.find({userId:id})
  }
  const findAllProperty=async()=>{
    return await Property.find()
  }
  const findAllPropertyById=async(id:Types.ObjectId)=>{
    return await Property.findOne(id)
  }
  


  return {
    addUser,
    findUserByEmail,
    addGoogleUser,
    findUserById,
    addProperty,
    findPropertybyUserId,
    findAllProperty,
    findAllPropertyById
  };
};
export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
