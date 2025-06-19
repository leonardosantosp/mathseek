import { z } from "zod";
import { semanticSearchController } from "../controllers/semanticSearch.controller";
import { resultSchema } from "../schemas/elasticsearch.schema";

export function semanticSearch(app) {
  app.post(
    "/wikipedia/semantic_search",
    {
      schema: {
        summary: "",
        description: "",
        tags: [""],
        body: z.object({
          query: z.string()
        }),
        response: {
          200: z.object({
            total: z.number(),
            results: z
              .array(resultSchema)
              .describe("List of documents matching the search query")
          }),
          500: z.object({
            message: z.string(),
            error: z.string()
          })
        }
      }
    },
    semanticSearchController
  );
}
