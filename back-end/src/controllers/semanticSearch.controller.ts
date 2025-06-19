import { getDocsSemanticWikipediaService } from "../services/semanticSearch.service";

export const semanticSearchController = async (request, reply) => {
  const { query } = request.body;

  try {
    const response = await getDocsSemanticWikipediaService(query);
    return reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Internal server error" });
  }
};
