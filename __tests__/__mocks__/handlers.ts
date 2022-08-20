import { graphql } from "msw";
import { SearchQuery, SearchQueryVariables } from "../../generated/graphql";
import { createRandomRepository } from "../__fixtures__/repository";

export const handlers = [
  graphql.query<SearchQuery, SearchQueryVariables>(
    "SearchQuery",
    (req, res, ctx) => {
      const { after, limit, query } = req.variables;

      let lang = query.match(/language:(.*)\s+(\s.*:)?/);

      const repos = Array.from({ length: limit || 10 }, (_, i) =>
        createRandomRepository({
          primaryLanguage: {
            id: `${i}`,
            name: lang ? lang[1] : "",
          },
        })
      );

      return res(
        ctx.data({
          search: {
            __typename: "SearchResultItemConnection",
            pageInfo: {
              __typename: "PageInfo",
              hasNextPage: !after,
              endCursor: "Y3Vyc29yOnYyOpHvA==",
            },
            nodes: repos,
          },
        })
      );
    }
  ),
];
