import { getUserById } from "../repository/user.repository";

export const getCardSettingsService = async (id: string) => {
  const user = await getUserById(id);

  if (!user) throw new Error("User not found");

  return {
    fontFamily: user.config.fontFamily,
    folders: user.config.folders,
    quickAccess: user.config.quickAccess,
    favorite: user.config.favorite,
    history: user.history
  };
};
