import { gql } from "urql";

export const REPO_TREE_QUERY = gql`
  fragment TreeEntryFields on TreeEntry {
    name
    type
    path
    oid
  }

  fragment FileFields on Blob {
    text
    byteSize
  }

  fragment TreeFields on Tree {
    entries {
      ...TreeEntryFields
    }
  }
  query RepoTreeQuery($owner: String!, $name: String!, $path: String!) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef {
        name
      }
      object(expression: $path) {
        ...TreeFields
        ...FileFields
      }
    }
  }
`;
