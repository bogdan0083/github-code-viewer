import { z } from "zod";

export const RepoModel = z.object({
  id: z.string(),
  nameWithOwner: z.string(),
  description: z.nullable(z.string()),
  forkCount: z.number(),
  stargazerCount: z.number(),
  primaryLanguage: z.optional(
    z.object({
      name: z.string(),
      color: z.nullable(z.string()),
    })
  ),
});

export const RepoListModel = z.array(RepoModel);

export type Repo = z.infer<typeof RepoModel>;
export type RepoList = z.infer<typeof RepoListModel>;
