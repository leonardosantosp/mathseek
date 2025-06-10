import { getCardSettingsService } from "../services/cardSettings.service";

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
