import { UpdateProfileDto } from "../dto/profile/updateProfile.dto";
import { CreateUserDto } from "../dto/user/createUser.dto";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser
} from "../repository/user.repository";
import { hashPassword } from "../utils/hash";

export const getUserByIdService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("user not found");
  return user;
};

export const getUserByUsernameService = async (username: string) => {
  const user = await getUserByUsername(username);
  if (!user) throw new Error("user not found");
  return user;
};

const verifyUserExists = async (username: string, email: string) => {
  let existUser = await getUserByUsername(username);
  if (existUser) throw new Error("User already exists");
  existUser = await getUserByEmail(email);
  if (existUser) throw new Error("User already exists");
  return existUser;
};

export const createUserService = async (user: CreateUserDto) => {
  await verifyUserExists(user.username, user.email);

  const newUser = {
    username: user.username,
    email: user.email,
    hashedPassword: await hashPassword(user.password),
    history: [],
    avatar: "",
    status: "",
    config: {
      backgroundImage: "",
      fontFamily: "",
      outputMethod: "diffScreen",
      themeColor: "",
      favorite: [],
      folders: [],
      quickAccess: []
    }
  };
  const response = await createUser(newUser);
  return response;
};

export const deleteUserService = async (id: string) => {
  const response = await deleteUser(id);

  if (!response) throw new Error("User not found");
};

export const updateProfileService = async (
  id: string,
  profile: UpdateProfileDto
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  const updateFields: Record<string, any> = {};

  if (profile.username !== undefined) updateFields.username = profile.username;
  if (profile.status !== undefined) updateFields.status = profile.status;
  if (profile.avatar !== undefined) updateFields.avatar = profile.avatar;

  return await updateUser(id, updateFields);
};
