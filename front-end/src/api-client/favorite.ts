import { API } from "./api";

export const getFavorites = async (favorites: number[] | undefined) => {
  if (!favorites) return;
  const promises = favorites.map(id => API.get(`/wikipedia/${id}`));
  const responses = await Promise.all(promises);
  return responses.map(response => response.data);
};

export const addToFavorites = async (documentId: number) => {
  const payload = {
    favorite: documentId,
    type: "add"
  };

  try {
    return await API.patch("/users/me/favorites", payload);
  } catch (error) {
    console.error("DIRECT FETCH ERROR:", error);
  }
};

export const removeFromFavorites = async (documentId: string) => {
  const payload = {
    favorite: parseInt(documentId),
    type: "remove"
  };

  try {
    return await API.patch("/users/me/favorites", payload);
  } catch (error) {
    console.error("DIRECT FETCH ERROR:", error);
  }
};
