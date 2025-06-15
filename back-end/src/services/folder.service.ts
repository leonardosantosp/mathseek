import { UpdateFoldersDto } from "../dto/folders/updateFolders.dto";
import {
  getUserById,
  getUserFolder,
  removeUserArrays,
  updateUser,
  updateUserArrays
} from "../repository/user.repository";

export const getFoldersService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return user.config.folders;
};

export const getFolderByFolderNameService = async (
  id: string,
  folderName: string
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  const folders = await getUserFolder(id, folderName);
  if (!folders) throw new Error("Folder not found");
  return folders.config.folders[0];
};

export const addOrRemoveFoldersService = async (
  id: string,
  folders: UpdateFoldersDto,
  type: string
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  if (type === "add") {
    return await updateUserArrays(id, {
      "config.folders": folders
    });
  }

  return await removeUserArrays(id, {
    "config.folders": folders
  });
};
