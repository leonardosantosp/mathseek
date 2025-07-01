import { API } from "./api";

export const getShortcuts = async (shortcuts: number[] | undefined) => {
  if (!shortcuts) return;
  const promises = shortcuts.map(id => API.get(`/wikipedia/${id}`));
  const responses = await Promise.all(promises);
  return responses.map(response => response.data);
};

export const addToShortcuts = async (documentId: number) => {
  const payload = {
    quickAccess: documentId,
    type: "add"
  };

  try {
    return await API.patch("/users/me/shortcuts", payload);
  } catch (error) {
    console.error("DIRECT FETCH ERROR:", error);
  }
};

export const removeFromShortcuts = async (documentId: string) => {
  const payload = {
    quickAccess: parseInt(documentId),
    type: "remove"
  };

  try {
    return await API.patch("/users/me/shortcuts", payload);
  } catch (error) {
    console.error("DIRECT FETCH ERROR:", error);
  }
};
