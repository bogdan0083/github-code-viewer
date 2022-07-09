import { withUrqlClient } from "next-urql";
import { NextPage } from "next";
import { GITHUB_GRAPHQL_URL } from "./constants";

const withDefaultGithubClient = (AppOrPage: NextPage<any, any> | any) => {
  return withUrqlClient(() => ({
    url: GITHUB_GRAPHQL_URL,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    },
  }))(AppOrPage);
};

export default withDefaultGithubClient;
