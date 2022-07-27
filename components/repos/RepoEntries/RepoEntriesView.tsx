import { useRouter } from "next/router";
import {
  TreeFieldsFragment,
  useRepoTreeQuery,
} from "../../../generated/graphql";
import RepoEntries from "./RepoEntries";
import orderBy from "lodash.orderby";
import { useMemo } from "react";

type QueryParams = {
  owner: string;
  name: string;
  path?: string[];
};

const RepoEntriesView = () => {
  const router = useRouter();
  // @ts-ignore
  const { owner, name, path = [] }: QueryParams = router.query;

  const isFilePath = path[path.length - 1]?.includes(".");

  let slicedPath;
  console.log(path);

  if (isFilePath) {
    slicedPath = path.slice(0, path.length - 1);
  } else {
    slicedPath = path.length > 1 ? path?.slice(0, path?.length - 1) : path;
  }

  console.log(slicedPath);

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
        showBackFolder={true}
        size={"xs"}
      />
    </div>
  );
};

export default RepoEntriesView;
