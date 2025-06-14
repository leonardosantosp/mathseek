import { UpdateFoldersDto } from "../dto/folders/updateFolders.dto";
import { getUserById, updateUser } from "../repository/user.repository";

export const getFoldersService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return user.config.folders;
};

export const updateFoldersService = async (
  id: string,
  folders: UpdateFoldersDto
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return await updateUser(id, {
    "config.folders": folders
  });
};
