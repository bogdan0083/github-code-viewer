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
    oid
  }

  fragment TreeFields on Tree {
    id
    entries {
      ...TreeEntryFields
    }
  }
  query RepoTreeQuery($owner: String!, $name: String!, $path: String!) {
    repository(owner: $owner, name: $name) {
      id
      defaultBranchRef {
        name
        id
      }
      object(expression: $path) {
        id
        ...TreeFields
      }
    }
  }
  query RepoBlobQuery($owner: String!, $name: String!, $path: String!) {
    repository(owner: $owner, name: $name) {
      id
      defaultBranchRef {
        name
        id
      }
      object(expression: $path) {
        id
        ...TreeFields
        ...FileFields
      }
    }
  }
`;
