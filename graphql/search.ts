import { OperationContext, useQuery, UseQueryState } from "urql";
import { SearchOptions } from "../models/common";
import { SearchResults, SearchResultsModel } from "../models/search";
import { ZodError } from "zod";
import { useEffect, useState } from "react";

export const SEARCH_QUERY = `
query SearchQuery($query: String!, $limit: Int, $type: SearchType!, $after: String) {
  search(type: $type, query: $query, first: $limit, after: $after) {
     pageInfo {
        endCursor
        hasNextPage
     }
      nodes {
        ... on Repository {
          id
          description
          forkCount
          stargazerCount
          languages(first: 3, orderBy: {field: SIZE, direction: DESC }) {
            nodes {
              color
              name
            }
          }
          nameWithOwner
        }
      }
  }
}`;

type UseSearchState<Data = any, Variables = object> = UseQueryState<
  Data,
  Variables
> & { searchResults?: SearchResults; validationError?: ZodError };

export type UseSearchResponse<Data = any, Variables = object> = [
  UseSearchState<Data, Variables>,
  (opts?: Partial<OperationContext>) => void
];

export const useSearch = (
  searchOpts: SearchOptions
): UseSearchResponse<SearchResults> => {
  const [result, reexecuteQuery] = useQuery({
    query: SEARCH_QUERY,
    variables: {
      query: searchOpts.query,
      limit: searchOpts.limit,
      after: searchOpts.after,
      created: searchOpts.created,
      type: searchOpts.type,
    },
  });

  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [validationError, setValidationError] = useState<ZodError>();

  const { data } = result;

  useEffect(() => {
    if (data) {
      const { search } = data;

      const { nodes, pageInfo } = search;

      const parseResult = SearchResultsModel.safeParse({
        items: nodes,
        pageInfo,
      });

      if (parseResult.success) {
        setSearchResults(parseResult.data);
      } else {
        setValidationError(parseResult.error);
      }
    }
  }, [data]);

  return [{ searchResults, validationError, ...result }, reexecuteQuery];
};
