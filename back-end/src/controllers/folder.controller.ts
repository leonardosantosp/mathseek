import {
  addOrRemoveFoldersService,
  addOrRemoveItemInFolderService,
  getFolderByFolderNameService,
  getFoldersService
} from "../services/folder.service";

export const getFoldersController = async (request, reply) => {
  const id = request.user?.id;

  try {
    const folders = await getFoldersService(id);
    return reply.code(200).send(folders);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "User not found" });
  }
};

export const getFolderByFolderNameController = async (request, reply) => {
  const id = request.user?.id;
  const { folderName } = request.params;
  try {
    const folder = await getFolderByFolderNameService(id, folderName);
    return reply.code(200).send(folder);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    if (error instanceof Error && error.message === "Folder not found") {
      return reply.code(404).send({ message: "Folder not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "User not found" });
  }
};

export const updateFoldersController = async (request, reply) => {
  const id = request.user?.id;
  const { folders, type } = request.body;

  try {
    const newUser = await addOrRemoveFoldersService(id, folders, type);
    return reply.code(200).send(newUser);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "User not found" });
  }
};

export const addOrRemoveItemInFolderController = async (request, reply) => {
  const id = request.user?.id;
  const { folderName } = request.params;
  const { type, item } = request.body;

  try {
    const newUser = await addOrRemoveItemInFolderService(
      id,
      folderName,
      type,
      item
    );
    return reply.code(200).send(newUser);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    if (error instanceof Error && error.message === "Folder not found") {
      return reply.code(404).send({ message: "Folder not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "User not found" });
  }
};
