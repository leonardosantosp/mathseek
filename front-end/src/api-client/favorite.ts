import { API } from "./api";

export const addToFavorites = async (documentId: number) => {
  const response = await API.patch("/users/me/favorites", {
    favorite: documentId,
    type: "add"
  });
  return response.data;
};

export const removeFromFavorites = async (documentId: number) => {
  const response = await API.patch("/users/me/favorites", {
    favorite: documentId,
    type: "remove"
  });
  return response.data;
};
