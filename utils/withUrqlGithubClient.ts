import { withUrqlClient } from "next-urql";
import { NextPage } from "next";
import { GITHUB_GRAPHQL_URL } from "./constants";

const withDefaultGithubClient = (p: NextPage) => {
  return withUrqlClient(() => ({
    url: GITHUB_GRAPHQL_URL,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    },
  }))(p);
};

export default withDefaultGithubClient;
