import { withUrqlClient } from "next-urql";
import { NextPage } from "next";
import { GITHUB_GRAPHQL_URL } from "./constants";
import { devtoolsExchange } from "@urql/devtools";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { retryExchange } from "@urql/exchange-retry";
import { relayPagination } from "@urql/exchange-graphcache/extras";

export const graphqlGithubClientConfig = {
  url: GITHUB_GRAPHQL_URL,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          search: relayPagination(),
        },
      },
      keys: {
        // @ts-ignore
        TreeEntry: (entry) => entry.path || null,

        // @ts-ignore
        Blob: (data) => data.path || null,
      },
    }),
    retryExchange({}),
    fetchExchange,
    errorExchange({
      onError: (e) => {
        throw e;
      },
    }),
  ],
};

const withDefaultGithubClient = (AppOrPage: NextPage<any, any> | any) => {
  return withUrqlClient(() => graphqlGithubClientConfig)(AppOrPage);
};

export default withDefaultGithubClient;
