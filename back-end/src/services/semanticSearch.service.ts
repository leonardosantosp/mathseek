import { Client } from "@elastic/elasticsearch";
import { generateEmbeding } from "../utils/generateEmbed";

type WikipediaDocument = {
  title: string;
  url: string;
  content: string;
  dt_creation: string;
  reading_time: number;
};

export const elasticClient = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "user123"
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const getDocsSemanticWikipediaService = async (query: string) => {
  const queryEmbedding = await generateEmbeding(query);

  const semanticSearchQuery = {
    knn: {
      field: "embedding", // Campo onde os embeddings estão armazenados
      query_vector: queryEmbedding,
      k: 3, // Número de resultados
      num_candidates: 100 // Número de candidatos a considerar
    }
  };

  const results = await elasticClient.search<WikipediaDocument>({
    index: "wikipedia_semantic",
    body: semanticSearchQuery
  });

  return {
    total:
      typeof results.hits.total === "number"
        ? results.hits.total
        : results.hits.total?.value || 0,
    results: results.hits.hits.map(item => ({
      _id: item._id,
      ...item._source
    }))
  };
};
