import { TreeFieldsFragment } from "../../../generated/graphql";
import RepoDirectoryEntry from "./RepoDirectoryEntry";
import RepoFileEntry from "./RepoFileEntry";
import { useRouter } from "next/router";
import clsx from "clsx";

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
  const router = useRouter();
  const { owner, path = [] } = router.query as {
    owner: string;
    path: string[];
  };

  const cls = clsx(
    "list-none transition-opacity",
    (isLoading && entries && entries.length > 0) && "opacity-50"
  );


  return (
    <ul className={cls}>
      {showBackFolder && (
        <RepoDirectoryEntry
          name={".."}
          oid={"123"}
          path={currentPath.slice(0, -1).join("/")}
          size={size}
          selected={false}
        />
      )}
      {entries?.map((entry) =>
        entry ? (
          entry.type === "tree" ? (
            <RepoDirectoryEntry
              {...entry}
              key={entry.oid}
              size={size}
              selected={selectedEntryPath === entry.name}
            />
          ) : (
            <RepoFileEntry
              {...entry}
              key={entry.oid}
              size={size}
              selected={selectedEntryPath === entry.name}
            />
          )
        ) : null
      )}
    </ul>
  );
};

export default RepoEntries;
