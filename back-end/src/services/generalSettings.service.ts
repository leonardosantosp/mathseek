import { UpdateGeneralSettingsDto } from "../dto/generalSettings/UpdateGeneralSettings.dto";
import { getUserById, updateUser } from "../repository/user.repository";

export const getGeneralSettingsService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return {
    themeColor: user.config.themeColor,
    backgroundImage: user.config.backgroundImage,
    outputMethod: user.config.outputMethod
  };
};

export const updateGeneralSettingsService = async (
  id: string,
  generalSettings: UpdateGeneralSettingsDto
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  return await updateUser(id, {
    "config.backgroundImage": generalSettings.backgroundImage,
    "config.outputMethod": generalSettings.outputMethod,
    "config.themeColor": generalSettings.themeColor
  });
};
