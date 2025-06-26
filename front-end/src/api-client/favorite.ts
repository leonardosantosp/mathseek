import { API } from "./api";

export const getFavorites = async (favorites: number[] | undefined) => {
  if (!favorites) return;
  const promises = favorites.map(id => API.get(`/wikipedia/${id}`));
  const responses = await Promise.all(promises);
  return responses.map(response => response.data);
};

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
