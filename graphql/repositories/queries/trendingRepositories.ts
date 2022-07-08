import { CombinedError, useQuery } from "urql";
import { oneWeekAgo } from "../../../utils/oneWeekAgo";
import { Repo } from "../../../models/repo";

export const TRENDING_REPOS_QUERY = `
query TrendingReposQuery($query: String!) {
  search(type: REPOSITORY, query: $query, first: 30) {
    edges {
      node {
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
  }
}`;

const query = `created:>${oneWeekAgo()}`;

type HookResponse = {
  data?: any;
  fetching: boolean;
  repos?: Repo[];
  error?: CombinedError;
};

const normalize = ({ node }: any) => {
  if (node.languages.nodes.length > 0) {
    const { name, color } = node.languages.nodes[0];
    return {
      ...node,
      primaryLanguage: { name, color },
    };
  }
  return node;
};

export const useTrendingRepos = (): HookResponse => {
  const [result] = useQuery({
    query: TRENDING_REPOS_QUERY,
    variables: { query },
  });

  const { data, fetching, error } = result;

  if (data) {
    const { search } = data;
    const { edges } = search;

    const repos = edges.map(normalize);

    return { repos, fetching, error };
  }

  return { data, fetching, error };
};
