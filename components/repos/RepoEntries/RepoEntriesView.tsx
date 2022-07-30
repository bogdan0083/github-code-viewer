import { useRouter } from "next/router";
import {
  TreeFieldsFragment,
  useRepoTreeQuery,
} from "../../../generated/graphql";
import RepoEntries from "./RepoEntries";
import orderBy from "lodash.orderby";
import { useMemo } from "react";
import { RepoPageQueryParams } from "../../../lib/utils/types";

const RepoEntriesView = () => {
  const router = useRouter();
  // @ts-ignore
  const { owner, name, path = [] } = router.query as RepoPageQueryParams;

  const isFilePath = path[path.length - 1]?.includes(".");

  let slicedPath;

  if (isFilePath) {
    slicedPath = path.slice(0, path.length - 1);
  } else {
    slicedPath = path.length > 0 ? path?.slice(0, path?.length - 1) : path;
  }

  let selectedEntryPath = path[path.length - 1];
  console.log(selectedEntryPath);

  const [result] = useRepoTreeQuery({
    variables: {
      owner: owner as string,
      name: name as string,
      path: `HEAD:${slicedPath.join("/") || ""}`,
    },
  });

  const { data, error, fetching } = result;

  let object = data?.repository?.object as TreeFieldsFragment;

  let sortedEntries = useMemo(
    () => orderBy(object?.entries, "type", ["desc"]),
    [object?.entries]
  );

  return (
    <div
      className={
        "text-xs p-2 h-[var(--sidenav-height)] overflow-auto fixed w-[inherit]"
      }
    >
      <RepoEntries
        entries={sortedEntries}
        isLoading={fetching}
        currentPath={slicedPath}
        showBackFolder={slicedPath.length > 0 && !fetching}
        selectedEntryPath={selectedEntryPath}
        size={"xs"}
      />
    </div>
  );
};

export default RepoEntriesView;
