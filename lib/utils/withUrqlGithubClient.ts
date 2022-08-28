import { NextPage } from "next";
import { GITHUB_GRAPHQL_URL } from "./constants";
import {
  ClientOptions,
  dedupExchange,
  errorExchange,
  fetchExchange,
} from "urql";
import { withUrqlClient } from "next-urql";
import { retryExchange } from "@urql/exchange-retry";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { devtoolsExchange } from "@urql/devtools";

export const graphqlGithubClientConfig: ClientOptions = {
  url: GITHUB_GRAPHQL_URL,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  },
  exchanges: [
    dedupExchange,
    devtoolsExchange,
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
