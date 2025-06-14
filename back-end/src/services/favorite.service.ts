import { config } from "dotenv";
import { UpdateFavoriteDto } from "../dto/favorite/updateFavorite.dto";
import { getUserById, updateUser } from "../repository/user.repository";

export const getFavoritesService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  return user.config.favorite;
};

export const updateFavoriteService = async (
  id: string,
  favorite: UpdateFavoriteDto
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  return await updateUser(id, {
    config: {
      favorite: favorite
    }
  });
};
