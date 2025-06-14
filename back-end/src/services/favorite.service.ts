import { config } from "dotenv";
import { UpdateFavoriteDto } from "../dto/favorite/updateFavorite.dto";
import {
  getUserById,
  removeUserArrays,
  updateUser,
  updateUserArrays
} from "../repository/user.repository";

export const getFavoritesService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  return user.config.favorite;
};

export const addOrRemoveFavoriteService = async (
  id: string,
  favorite: UpdateFavoriteDto,
  type: string
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  if (type === "add") {
    return await updateUserArrays(id, {
      "config.favorite": favorite
    });
  }

  return await removeUserArrays(id, {
    "config.favorite": favorite
  });
};
