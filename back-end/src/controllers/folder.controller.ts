import {
  getFoldersService,
  updateFoldersService
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

export const updateFoldersController = async (request, reply) => {
  const id = request.user?.id;
  const { folders } = request.body;

  try {
    const newUser = await updateFoldersService(id, folders);
    return reply.code(200).send(newUser);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "User not found" });
  }
};
