import {
  getHistoryService,
  updateHistoryService
} from "../services/history.service";

export const getHistoryController = async (request, reply) => {
  const id = request.user?.id;

  try {
    const history = await getHistoryService(id);
    return reply.code(200).send(history);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "user not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const updateHistoryController = async (request, reply) => {
  const id = request.user?.id;
  const newHistory = request.body;

  try {
    const updatedUser = await updateHistoryService(id, newHistory);
    return reply.code(200).send(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
