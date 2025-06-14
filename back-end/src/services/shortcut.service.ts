import { UpdateShortcutsDto } from "../dto/shortcuts/updateShortcuts.dto";
import {
  getUserById,
  removeUserArrays,
  updateUser,
  updateUserArrays
} from "../repository/user.repository";

export const getShortcutsService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return user.config.quickAccess;
};

export const addOrRemoveShortcutsService = async (
  id: string,
  shortcuts: UpdateShortcutsDto,
  type: string
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  if (type === "add") {
    return await updateUserArrays(id, {
      "config.quickAccess": shortcuts
    });
  }

  return await removeUserArrays(id, {
    "config.quickAccess": shortcuts
  });
};
