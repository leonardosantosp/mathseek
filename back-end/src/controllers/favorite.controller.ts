import {
  addOrRemoveFavoriteService,
  getFavoritesService
} from "../services/favorite.service";

export const getFavoriteController = async (request, reply) => {
  const userId = request.user?.id;

  try {
    const favorite = await getFavoritesService(userId);
    return reply.code(200).send(favorite);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const updateFavoriteController = async (request, reply) => {
  const userId = request.user?.id;
  const { favorite, type } = request.body;

  if (!favorite || !type) {
    console.log("Invalid payload structure:", { favorite, type });
    return reply.code(400).send({
      message: "Payload must contain {favorite: number, type: string}"
    });
  }

  try {
    const updateUser = await addOrRemoveFavoriteService(userId, favorite, type);
    return reply.code(200).send(updateUser);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
