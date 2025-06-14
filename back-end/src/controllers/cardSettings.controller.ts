import {
  getCardSettingsService,
  updateCardSettingsService
} from "../services/cardSettings.service";

export const getCardSettingsController = async (request, reply) => {
  const id = request.user?.id;

  try {
    const cardSettings = await getCardSettingsService(id);
    return reply.code(200).send(cardSettings);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export const updateCardSettingsController = async (request, reply) => {
  const id = request.user?.id;
  const cardSettings = request.body;

  try {
    const newUser = await updateCardSettingsService(id, cardSettings);
    return reply.code(200).send(newUser);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      return reply.code(404).send({ message: "User not found" });
    }
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
