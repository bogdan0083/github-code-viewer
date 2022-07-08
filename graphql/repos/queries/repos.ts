import { CombinedError, useQuery } from "urql";
import { Repo } from "../../../models/repo";

export const REPOS_QUERY = `
query ReposQuery($query: String!, $limit: Int!) {
  search(type: REPOSITORY, query: $query, first: $limit) {
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
          languages(first: 1) {
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

type UseReposResponse = {
  data?: any;
  fetching: boolean;
  repos?: Repo[];
  endCursor?: string;
  error?: CombinedError;
};

const normalize = (node: any) => {
  if (node.languages.nodes.length > 0) {
    const { name, color } = node.languages.nodes[0];
    return {
      ...node,
      primaryLanguage: { name, color },
    };
  }
  return node;
};

type UseReposOptions = {
  query: string;
  limit?: number;
  page?: number;
};

const useReposDefaultOptions: Partial<UseReposOptions> = {
  limit: 10,
  page: 1,
};

export const useRepos = (userOpts: UseReposOptions): UseReposResponse => {
  const opts = { ...useReposDefaultOptions, ...userOpts };

  const [result] = useQuery({
    query: REPOS_QUERY,
    variables: { query: opts.query, limit: opts.limit },
  });

  const { data, fetching, error } = result;

  if (data) {
    const { search } = data;
    const { nodes } = search;

    const repos = nodes.map(normalize);

    return { repos, fetching, error, endCursor: search?.pageInfo?.endCursor };
  }

  return { data, fetching, error };
};
