import {
  addOrRemoveShortcutsService,
  getShortcutsService
} from "../services/shortcut.service";

export const getShortcutsController = async (request, reply) => {
  const id = request.user?.id;
  try {
    const shortcuts = await getShortcutsService(id);
    return reply.code(200).send(shortcuts);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(500);
    return reply.code(500).send({ message: "internal server error" });
  }
};

export const updateShortcutsController = async (request, reply) => {
  const id = request.user?.id;
  const { quickAccess, type } = request.body;

  try {
    const newUser = await addOrRemoveShortcutsService(id, quickAccess, type);
    return reply.code(200).send(newUser);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
