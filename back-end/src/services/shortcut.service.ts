import { UpdateShortcutsDto } from "../dto/shortcuts/updateShortcuts.dto";
import { getUserById, updateUser } from "../repository/user.repository";

export const getShortcutsService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return user.config.quickAccess;
};

export const updateShortcutsService = async (
  id: string,
  shortcuts: UpdateShortcutsDto
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  return await updateUser(id, {
    "config.quickAccess": shortcuts
  });
};
