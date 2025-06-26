import { API } from "./api";

type Login = {
  username: string;
  password: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  status: string;
  history: number[];
  avatar: string;
  hashedPassword: string;
  config: {
    backgroundImage: string;
    fontFamily: string;
    outputMethod: string;
    themeColor: string;
    favorite: number[];
    folders: {
      folderName: string;
      wikipages: number[];
    };
    quickAccess: number[];
  };
  isPassword: boolean;
  accessToken: string;
  refreshToken: string;
};

export const login = async (user: Login): Promise<User> => {
  const response = await API.post("/login", user);
  return response.data;
};
