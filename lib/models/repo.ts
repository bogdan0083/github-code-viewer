import { z } from "zod";

export const RepoLang = z.object({
  name: z.string(),
  color: z.string(),
});

export const RepoModel = z.object({
  id: z.string(),
  nameWithOwner: z.string(),
  description: z.nullable(z.string()),
  forkCount: z.number(),
  stargazerCount: z.number(),
  languages: z.object({
    nodes: z.array(RepoLang),
  }),
});

export const RepoListModel = z.array(RepoModel);

export type Repo = z.infer<typeof RepoModel>;
export type RepoList = z.infer<typeof RepoListModel>;
