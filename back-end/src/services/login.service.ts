import { getUserByUsername } from "../repository/user.repository";
import { verifyPassword } from "../utils/hash";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginService = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (!user) throw new Error("User not found");
  const isPassword = await verifyPassword(password, user.hashedPassword);
  if (!isPassword) throw new Error("Invalid Password");

  const accessToken = jwt.sign(
    { username: user.username, id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: user.username, id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return {
    user,
    isPassword: isPassword,
    accessToken,
    refreshToken
  };
};

export const refreshService = async (refreshToken: string) => {
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, user => {
    const newAccessToken = jwt.sign(
      { user: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return { new_access_token: newAccessToken };
  });
};
