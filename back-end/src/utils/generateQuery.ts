export function buildElasticQuery(userQuery) {
  return {
    query_string: {
      query: userQuery,
      default_field: "content",
      phrase_slop: 2,
      boost: 1.0,
      analyze_wildcard: true,
      allow_leading_wildcard: false
    }
  };
}
