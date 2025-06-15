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
  return await UserSchema.findByIdAndUpdate(
    { _id: id },
    { $set: user },
    { new: true }
  );
};

export const updateUserArrays = async (id: string, user: any) => {
  return await UserSchema.findByIdAndUpdate(
    { _id: id },
    { $addToSet: user },
    { new: true }
  );
};

export const removeUserArrays = async (id: string, user: any) => {
  return await UserSchema.findByIdAndUpdate(
    { _id: id },
    { $pull: user },
    { new: true }
  );
};

export const getUserFolder = async (id: string, folderName: string) => {
  return await UserSchema.findOne(
    {
      _id: id,
      "config.folders.folderName": folderName
    },
    {
      "config.folders.$": 1
    }
  );
};

export const addItemToFolder = async (
  id: string,
  folderName: string,
  item: number
) => {
  return await UserSchema.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { "config.folders.$[folder].wikipages": item }
    },
    {
      arrayFilters: [{ "folder.folderName": folderName }],
      new: true
    }
  );
};

export const removeItemFromFolder = async (
  id: string,
  folderName: string,
  item: number
) => {
  return await UserSchema.findOneAndUpdate(
    { _id: id },
    {
      $pull: { "config.folders.$[folder].wikipages": item }
    },
    {
      arrayFilters: [{ "folder.folderName": folderName }],
      new: true
    }
  );
};
