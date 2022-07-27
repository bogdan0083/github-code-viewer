import { TreeFieldsFragment } from "../../../generated/graphql";
import RepoDirectoryEntry from "./RepoDirectoryEntry";
import RepoFileEntry from "./RepoFileEntry";
import { useRouter } from "next/router";

export type RepoEntrySize = "xs" | "sm" | "md" | "lg";

interface RepoEntriesProps {
  entries?: TreeFieldsFragment["entries"];
  isLoading?: boolean;
  showBackFolder: boolean;
  size: RepoEntrySize;
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
}: RepoEntriesProps) => {
  const router = useRouter();
  const { owner, path = [] } = router.query as {
    owner: string;
    path: string[];
  };

  const slicedPath = path.slice(0, path.length - 2).join("/");

  return (
    <ul className={"list-none"} style={{ width: "calc(100% - 1px)" }}>
      {path.length > 0 && showBackFolder && (
        <RepoDirectoryEntry
          name={".."}
          oid={"123"}
          type={"tree"}
          path={slicedPath}
          size={size}
        />
      )}
      {entries?.map((entry) =>
        entry ? (
          entry.type === "tree" ? (
            <RepoDirectoryEntry {...entry} key={entry.oid} size={size} />
          ) : (
            <RepoFileEntry {...entry} key={entry.oid} size={size} />
          )
        ) : null
      )}
    </ul>
  );
};

export default RepoEntries;
