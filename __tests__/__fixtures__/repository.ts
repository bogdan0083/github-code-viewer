import { RepoFieldsFragment } from "../../__generated__/graphql";
import { faker } from "@faker-js/faker";
import { RecursivePartial } from "../../lib/utils/types";

export const createRandomRepository = (
  overrides?: RecursivePartial<RepoFieldsFragment>
): RepoFieldsFragment => {
  return {
    __typename: "Repository",
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    forkCount: faker.datatype.number(),
    stargazerCount: faker.datatype.number(),
    primaryLanguage: {
      __typename: "Language",
      id: faker.datatype.uuid(),
      name: overrides?.primaryLanguage?.name || faker.internet.userName(),
      color: faker.internet.color(),
    },
    defaultBranchRef: {
      __typename: "Ref",
      id: faker.datatype.uuid(),
      name: "master",
    },
    owner: {
      __typename: "User",
      id: faker.datatype.uuid(),
      login: faker.internet.userName(),
    },
    name: faker.internet.userName(),
    nameWithOwner: `${faker.internet.userName()}/${faker.internet.userName()}`,
  };
};
