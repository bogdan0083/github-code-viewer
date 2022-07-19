import { z } from "zod";
import { RepoListModel } from "./repo";

export const SearchItemsModel = z.union([RepoListModel, z.undefined()]);

export const SearchResultsModel = z.object({
  items: SearchItemsModel,
  pageInfo: z.object({
    hasNextPage: z.boolean(),
    endCursor: z.string(),
  }),
});

export type SearchResults = z.infer<typeof SearchResultsModel>;
