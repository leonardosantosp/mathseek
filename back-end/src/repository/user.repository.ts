import { UserSchema } from "../models/user.model";

export const getUserById = async (id: string) => {
  const user = await UserSchema.findById(id);
  return user;
};

export const getUserByUsername = async (username: string) => {
  return await UserSchema.findOne({ username: username });
};

export const createUser = async (user: any) => {
  return await UserSchema.create(user);
};

export const deleteUser = async (id: string) => {
  return await UserSchema.findByIdAndDelete(id);
};

export const updateUser = async (id: string, user: any) => {
  return await UserSchema.updateOne({ _id: id }, user);
};
