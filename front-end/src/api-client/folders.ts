import { API } from "./api";

export const getFolder = async () => {
  const backendResponse = await API.get("/users/me/folders");
  return backendResponse;
};

export const getFolderByFoldername = async (name: string) => {
  const backendResponse = await API.patch(`/users/me/folders/${name}`);
  return backendResponse;
};

export const updateFolder = async (
  name: string,
  type: "add" | "remove",
  item: number
) => {
  return await API.patch(`/users/me/folders/${name}/items`, {
    type,
    item
  });
};
