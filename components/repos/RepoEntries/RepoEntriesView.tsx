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

  const entryType = path[0];
  const branchName = path[1];

  let entryPath = path.slice(2);
  let parentPath = entryPath.slice(0, -1);
  let parentPathExpression = `${branchName}:${parentPath.join("/") || ""}`;
  const selectedEntryPath = entryPath[entryPath.length - 1];

  const [result] = useRepoTreeQuery({
    variables: {
      owner: owner as string,
      name: name as string,
      path: parentPathExpression,
    },
  });

  const { data, error, fetching } = result;

  let object = data?.repository?.object as TreeFieldsFragment;

  let sortedEntries = useMemo(
    () => orderBy(object?.entries, "type", ["desc"]),
    [object?.entries]
  );

  return (
    <div className={"text-xs p-2 overflow-auto h-full"}>
      <RepoEntries
        entries={sortedEntries}
        isLoading={fetching}
        currentPath={parentPath}
        showBackFolder={parentPath.length > 0 && !fetching}
        selectedEntryPath={selectedEntryPath}
        size={"xs"}
      />
    </div>
  );
};

export default RepoEntriesView;
