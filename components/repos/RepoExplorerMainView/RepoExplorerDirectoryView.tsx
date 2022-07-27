import { useRouter } from "next/router";
import { IoLogoGithub } from "react-icons/io5";
import { GITHUB_URL } from "../../../lib/utils/constants";
import {
  TreeFieldsFragment,
  useRepoTreeQuery,
} from "../../../generated/graphql";
import { useMemo } from "react";
import orderBy from "lodash.orderby";
import RepoEntries from "../RepoEntries/RepoEntries";
import { RepoPageQueryParams } from "../../../lib/utils/types";
import Topline from "../../common/Topline/Topline";

const RepoExplorerDirectoryView = () => {
  const router = useRouter();
  const { owner, name, path = [] } = router.query as RepoPageQueryParams;

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

  const right = useMemo(
    () => (
      <a href={fullGithubViewUrl} target="_blank" rel="noreferrer">
        <IoLogoGithub size={20} />
      </a>
    ),
    [fullGithubViewUrl]
  );

  const left = useMemo(() => <div>{slicedPath}</div>, [slicedPath]);

  return (
    <div>
      <Topline left={left} right={right} />
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

export default RepoExplorerDirectoryView;
