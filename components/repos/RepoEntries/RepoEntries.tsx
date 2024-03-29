import { TreeFieldsFragment } from "../../../__generated__/graphql";
import RepoDirectoryEntry from "./RepoDirectoryEntry";
import RepoFileEntry from "./RepoFileEntry";
import { useRouter } from "next/router";
import clsx from "clsx";
import { usePaletteMode } from "@lib/context/paletteModeContext";

export type RepoEntrySize = "xs" | "sm" | "md" | "lg";

interface RepoEntriesProps {
  entries?: TreeFieldsFragment["entries"];
  isLoading?: boolean;
  showBackFolder: boolean;
  size: RepoEntrySize;
  selectedEntryPath?: string;
  currentPath?: string[];
}

export const textSizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

export const iconSizeMap = {
  xs: 16,
  sm: 18,
  md: 32,
  lg: 48,
};

const RepoEntries = ({
  entries,
  isLoading,
  showBackFolder,
  size,
  selectedEntryPath,
  currentPath = [],
}: RepoEntriesProps) => {
  const [paletteMode] = usePaletteMode();
  const router = useRouter();
  const owner = router.query.owner as string;
  const ownerName = router.query.name as string;
  const routePath = (router.query.path as string[]) ?? [];
  const branchName = routePath[1];

  const cls = clsx(
    "list-none transition-opacity",
    isLoading && entries && entries.length > 0 && "opacity-50"
  );

  if (isLoading && !entries) {
    return <>Loading...</>;
  }

  const ownerWithName = `/${owner}/${ownerName}`;

  return (
    <ul className={cls} data-testid={"RepoEntries"}>
      {showBackFolder && (
        <RepoDirectoryEntry
          name={".."}
          oid={"123"}
          path={currentPath.slice(0, -1).join("/")}
          size={size}
          selected={false}
          paletteMode={paletteMode}
          href={`${ownerWithName}/tree/${branchName}/${currentPath
            .slice(0, -1)
            .join("/")}`}
        />
      )}
      {entries?.map((entry) =>
        entry ? (
          entry.type === "tree" ? (
            <RepoDirectoryEntry
              {...entry}
              key={entry.path}
              size={size}
              selected={selectedEntryPath === entry.name}
              paletteMode={paletteMode}
              href={`${ownerWithName}/tree/${branchName}/${entry.path}`}
            />
          ) : (
            <RepoFileEntry
              {...entry}
              key={entry.path}
              size={size}
              selected={selectedEntryPath === entry.name}
              paletteMode={paletteMode}
              href={`${ownerWithName}/blob/${branchName}/${entry.path}`}
            />
          )
        ) : null
      )}
    </ul>
  );
};

export default RepoEntries;
