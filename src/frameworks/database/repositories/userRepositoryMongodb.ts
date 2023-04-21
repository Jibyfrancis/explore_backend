import User from "../model/userModel";
import { UserInterface } from "../../../type/userInterface";

export const userRepositoryMongoDB = () => {
  const addUser = async (user: {
    userName: string;
    email: string;
    password: string;
    mobile: string;
  }) => {
    return await User.create(user);
  };

  const findUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };

  const findUserById = async (id: string) => {
    const user: UserInterface | null = await User.findById(id);
  };

  const addGoogleUser = async (user: {
    userName: string;
    email: string;
    photoUrl: string;
    isGoogleUser: boolean;
  }) => {
    return await User.create(user);
  };

  return {
    addUser,
    findUserByEmail,
    addGoogleUser,
    findUserById,
  };
};
export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
