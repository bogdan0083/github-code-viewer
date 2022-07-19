import { z } from "zod";

export const ExplorerFileModel = z.object({
  oid: z.string(),
  name: z.string(),
  path: z.string(),
  type: z.literal("blob"),
});

export type ExplorerTreeFile = z.infer<typeof ExplorerFileModel>;

export interface ExplorerTreeDirectory {
  oid: string;
  name: string;
  path: string;
  type: "tree";
  children?: Array<ExplorerTreeDirectory | ExplorerTreeFile>;
}

// @NOTE The code is quite duplicative, but I don't know how to make it more concise
// @see https://github.com/colinhacks/zod#recursive-types
export const ExplorerTreeDirectoryModel: z.ZodType<ExplorerTreeDirectory> =
  z.lazy(() =>
    z.object({
      oid: z.string(),
      name: z.string(),
      path: z.string(),
      type: z.literal("tree"),
      children: z.optional(
        z.array(z.union([ExplorerTreeDirectoryModel, ExplorerFileModel]))
      ),
    })
  );

export const ExplorerTreeModel = z.object({
  id: z.string(),
  entries: z.array(ExplorerTreeDirectoryModel),
});

export type ExplorerTree = z.infer<typeof ExplorerTreeModel>;
