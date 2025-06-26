import { API } from "./api";

type CreateUser = {
  username: string;
  email: string;
  password: string;
};

export const createUser = async (createUser: CreateUser) => {
  const response = await API.post("/signup", createUser);
  return response.data;
};

export const getUser = async () => {
  const response = await API.get("/user/me");
  return response.data;
};
