import { API } from "./api";

type Login = {
  username: string;
  password: string;
};

export const login = async (user: Login) => {
  const response = await API.post("/login", user);
  return response.data;
};
