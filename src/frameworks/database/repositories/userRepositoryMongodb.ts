import User from "../model/userModel";
import { UserInterface } from "../../../type/userInterface";
import { Types } from "mongoose";
import Property from "../model/propertyModel";
import Order from "../model/orderModel";
import { ConfirmOrderInterface } from "../../../type/confirmOrderInterface";

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
    return user;
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
      imageUrl: property.getImageUrl(),
    });

    return await Property.create(newProperty);
  };
  
  const findPropertybyUserId = async (id: Types.ObjectId) => {
    return await Property.find({
      userId: id,
    });
  };
  const findAllProperty = async () => {
    return await Property.find();
  };
  const findAllPropertyById = async (id: Types.ObjectId) => {
    console.log(id);
    return await Property.aggregate([
      { $match: { _id: id } },

      {
        $lookup: {
          from: "amenity",
          localField: "amenities",
          foreignField: "_id",
          as: "amenitydetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          roomType: 1,
          address: 1,
          location:1,
          price: 1,
          guest: 1,
          bedroom: 1,
          bathrooms: 1,
          kitchen: 1,
          balcony: 1,
          imageUrl: 1,
          amenitydetails: 1,
          "user.userName": 1,
        },
      },
    ]);
  };

  const addOrder = async (order: any) => {
    const newOrder = new Order({
      propertyId: order.getpropertyId(),
      propertyName: order.getPropertyName(),
      propertyAddress: order.getPropertyAddress(),
      image: order.getImage(),
      adult: order.getAdult(),
      children: order.getChildren(),
      checkIn: order.getCheckIn(),
      checkOut: order.getCheckOut(),
      totalPrice: order.getTotalPrice(),
      paymentId: order.getPaymentId(),
      paymentStatus: order.getPaymentStatus(),
    });
    return await Order.create(newOrder);
  };

  const conformOrde = async (data: ConfirmOrderInterface) => {
    return await Order.updateOne(
      { _id: data.orderId },
      { $set: { paymentStatus: "success", bookingStatus: "success" } }
    );
  };

  const findAllBooking = async () => {
    return await Order.find();
  };
  const cancelBooking = async (id: Types.ObjectId) => {
    try {
      return await Order.updateOne(
        { _id: id },
        { $set: { bookingStatus: "cancelled" } }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const searchProperty = async (data: any) => {
    console.log("formdb" + data.searchKey);
    const searchKey = data.searchKey[0];
    try {
      return await Property.find({ "address": { $regex: searchKey } });
    } catch (err) {
      console.log(err);
    }
  };

  const deletePropertyById = async (id: Types.ObjectId) => {
    try {
      return await Property.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addUser,
    findUserByEmail,
    addGoogleUser,
    findUserById,
    addProperty,
    findPropertybyUserId,
    findAllProperty,
    findAllPropertyById,
    addOrder,
    conformOrde,
    findAllBooking,
    cancelBooking,
    searchProperty,
    deletePropertyById,
  };
};
export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
