import { API } from "./api";

type UpdateGeneralSettings = {
  backgroundImage?: string;
  themeColor?: string;
  outputMethod?: string;
};

export const getGeneralSettings = async () => {
  return API.get(`/users/me/general-settings`);
};

export const updateGeneralSettings = async (body: UpdateGeneralSettings) => {
  try {
    return await API.patch("/users/me/general-settings", body);
  } catch (error) {
    console.error("DIRECT FETCH ERROR:", error);
  }
};
