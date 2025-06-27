import { API } from "./api";

export const getFavorites = async (favorites: number[] | undefined) => {
  if (!favorites) return;
  const promises = favorites.map(id => API.get(`/wikipedia/${id}`));
  const responses = await Promise.all(promises);
  return responses.map(response => response.data);
};

export const removeFromFavorites = async (documentId: number) => {
  const response = await API.patch("/users/me/favorites", {
    favorite: documentId,
    type: "remove"
  });
  return response.data;
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
// export const addToFavorites = async (favorite: number) => {
//   const testPayload = {
//     favorite: 11,
//     type: "add"
//   };

//   try {
//     const res = await fetch("http://localhost:3333/users/me/favorites", {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
//       },
//       body: JSON.stringify(testPayload)
//     });
//     console.log("TEST RESPONSE:", await res.json());
//   } catch (error) {
//     console.error("DIRECT FETCH ERROR:", error);
//   }
// };
