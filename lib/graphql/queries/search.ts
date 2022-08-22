import { gql } from "urql";
import {
  SearchQuery,
  SearchQueryVariables,
} from "../../../__generated__/graphql";

export const SEARCH_QUERY = gql<SearchQuery, SearchQueryVariables>`
  fragment RepoFields on Repository {
    ... on Repository {
      id
      description
      forkCount
      stargazerCount
      primaryLanguage {
        id
        color
        name
      }
      owner {
        id
        login
      }
      defaultBranchRef {
        id
        name
      }
      name
      nameWithOwner
    }
  }
  query SearchQuery(
    $query: String!
    $limit: Int
    $type: SearchType!
    $after: String
  ) {
    search(type: $type, query: $query, first: $limit, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ...RepoFields
      }
    }
  }
`;
