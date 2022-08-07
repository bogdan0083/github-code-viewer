import { withUrqlClient } from "next-urql";
import { NextPage } from "next";
import { GITHUB_GRAPHQL_URL } from "./constants";
import { devtoolsExchange } from "@urql/devtools";
import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { cacheExchange } from "@urql/exchange-graphcache";
import { retryExchange } from "@urql/exchange-retry";

const withDefaultGithubClient = (AppOrPage: NextPage<any, any> | any) => {
  return withUrqlClient(() => ({
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
      }),
      retryExchange({}),
      fetchExchange,
      errorExchange({
        onError: (e) => {
          throw e;
        },
      }),
    ],
  }))(AppOrPage);
};

export default withDefaultGithubClient;
