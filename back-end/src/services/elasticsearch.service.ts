import { Client, errors } from "@elastic/elasticsearch";
import { buildElasticQuery } from "../utils/generateQuery";

type WikipediaDocument = {
  title: string;
  url: string;
  content: string;
  dt_creation: string;
  reading_time: number;
  access_count?: number;
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

export const getDocsWikipediaService = async (
  query: string,
  page: number,
  pageSize: number
) => {
  const elasticQuery = buildElasticQuery(query);

  const results = await elasticClient.search<WikipediaDocument>({
    index: "wikipedia",
    from: (page - 1) * pageSize,
    size: pageSize,
    query: elasticQuery
  });

  return {
    total:
      typeof results.hits.total === "number"
        ? results.hits.total
        : results.hits.total?.value,
    results: results.hits.hits.map(item => ({
      _id: item._id,
      ...item._source
    }))
  };
};

export const getDocByIdWikipediaService = async (id: string) => {
  try {
    const result = await elasticClient.get({
      index: "wikipedia",
      id
    });

    const _id = result._id;
    const resultSource = result._source as WikipediaDocument;

    return {
      _id,
      title: resultSource.title,
      url: resultSource.url,
      content: resultSource.content,
      reading_time: resultSource.reading_time,
      access_count: resultSource.access_count
        ? resultSource.access_count + 1
        : 1,
      dt_creation: resultSource.dt_creation
    };
  } catch (error) {
    if (error instanceof errors.ResponseError && error.statusCode === 404) {
      throw new Error("document not found");
    }
  }
};

export const getMostViewedDocsWikipediaService = async (limit: number) => {
  const results = await elasticClient.search<WikipediaDocument>({
    index: "wikipedia",
    size: limit,
    sort: [
      {
        access_count: {
          order: "desc",
          missing: "_last"
        }
      },
      {
        dt_creation: {
          order: "desc"
        }
      }
    ],
    query: {
      match_all: {}
    }
  });

  return results.hits.hits.map(item => ({
    _id: item._id,
    ...item._source
  }));
};

export const addNumViewDocService = async (id: string) => {
  try {
    const response = await addNumView(id);
    return response;
  } catch (error) {
    if (error instanceof errors.ResponseError && error.statusCode === 404) {
      throw new Error("document not found");
    }
  }
};

export const addNumView = async (id: string) => {
  await elasticClient.update({
    index: "wikipedia",
    id,
    script: {
      source:
        "ctx._source.access_count = (ctx._source.access_count != null ? ctx._source.access_count : 0) + 1",
      lang: "painless"
    }
  });
};
