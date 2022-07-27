import { useRouter } from "next/router";
import { IoLogoGithub } from "react-icons/io5";
import { GITHUB_URL } from "../../../lib/utils/constants";
import {
  TreeFieldsFragment,
  useRepoTreeQuery,
} from "../../../generated/graphql";
import clsx from "clsx";
import { useMemo } from "react";
import orderBy from "lodash.orderby";
import RepoEntries from "../RepoEntries/RepoEntries";

type QueryParams = {
  owner: string;
  name: string;
  path?: string[];
};

const RepoExplorerMainView = () => {
  const router = useRouter();
  const { owner, name, path = [] } = router.query as QueryParams;

  // Check if the current path is a file.
  // For example vim/hello/src/main.c

  const isFile = path[path.length - 1]?.includes(".");

  const slicedPath = path?.join("/");

  const [result] = useRepoTreeQuery({
    variables: {
      owner: owner as string,
      name: name as string,
      path: `HEAD:${slicedPath || ""}`,
    },
  });

  const { data, error, fetching } = result;

  let object = data?.repository?.object as TreeFieldsFragment;

  let sortedEntries = useMemo(
    () => orderBy(object?.entries, "type", ["desc"]),
    [object?.entries]
  );

  let branchName = data?.repository?.defaultBranchRef?.name;

  const fullPath = `${owner}/${name}/tree/${branchName}/${slicedPath || ""}`;

  const fullGithubViewUrl = `${GITHUB_URL}/${fullPath}`;

  return (
    <div>
      <div
        className={
          "bg-gray-100 border-b border-gray-300 text-xs flex justify-between items-center px-2 py-2"
        }
      >
        <div className={"flex items-center"}>/{path?.join("/")}</div>
        <div
          className={clsx(
            "flex items-center",
            fetching && "opacity-40 pointer-events-none"
          )}
        >
          <a
            target={"_blank"}
            href={fullGithubViewUrl}
            rel="noreferrer"
            title={"View on GitHub"}
          >
            <IoLogoGithub size={20} />
          </a>
        </div>
      </div>
      <div className={"p-2"}>
        <RepoEntries
          showBackFolder={false}
          size={"sm"}
          entries={sortedEntries}
        />
      </div>
    </div>
  );
};

export default RepoExplorerMainView;
