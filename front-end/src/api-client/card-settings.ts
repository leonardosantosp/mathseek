import { API } from "./api";

export const getCardSettings = async () => {
  const backendResponse = await API.get("/users/me/card-settings");
  return backendResponse;
};

export const UpdateCardSettings = async (fontFamily: string) => {
  return await API.patch("/users/me/card-settings", { fontFamily });
};
