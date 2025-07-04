import { API } from "./api";

type UpdateProfileDto = {
  username?: string;
  status?: string;
  avatar?: string;
};

export const updateProfile = async (body: UpdateProfileDto) => {
  return await API.post("/users/me/profile", body);
};
