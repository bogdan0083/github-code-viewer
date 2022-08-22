import { faker } from "@faker-js/faker";
import { graphql } from "msw";
import {
  RepoBlobQuery,
  RepoBlobQueryVariables,
  RepoTreeQuery,
  RepoTreeQueryVariables,
  SearchQuery,
  SearchQueryVariables,
} from "../../__generated__/graphql";
import { createRandomRepository } from "../__fixtures__/repository";
import { getTreeEntries } from "../__fixtures__/treeEntry";
import readmeBlob from "../__fixtures__/blobs/readmeBlob";
import genericBlob from "../__fixtures__/blobs/genericBlob";

export const handlers = [
  graphql.query<RepoTreeQuery, RepoTreeQueryVariables>(
    "RepoTreeQuery",
    (req, res, ctx) => {
      const { path } = req.variables;
      let [_, pathStr] = path.split(":");

      const entries = getTreeEntries(pathStr || "/");
      return res(
        ctx.data({
          __typename: "Query",
          repository: {
            __typename: "Repository",
            id: "22",
            defaultBranchRef: {
              __typename: "Ref",
              id: "33",
              name: "master",
            },
            object: {
              __typename: "Tree",
              id: faker.datatype.uuid(),
              entries: entries,
            },
          },
        })
      );
    }
  ),
  graphql.query<RepoBlobQuery, RepoBlobQueryVariables>(
    "RepoBlobQuery",
    (req, res, ctx) => {
      const { path } = req.variables;
      let [_, pathStr] = path.split(":");
      let pathArr = pathStr.split("/");
      const file = pathArr[pathArr.length - 1];
      let blob = genericBlob;

      if (file === "README.md") {
        blob = readmeBlob;
      }

      return res(
        ctx.data({
          __typename: "Query",
          repository: {
            __typename: "Repository",
            id: "22",
            defaultBranchRef: {
              __typename: "Ref",
              id: "33",
              name: "master",
            },
            object: { id: faker.datatype.uuid(), ...blob },
          },
        })
      );
    }
  ),
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
