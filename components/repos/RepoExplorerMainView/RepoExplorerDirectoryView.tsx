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

  const entryType = path[0];
  const branchName = path[1];

  let entryPath = path.slice(2);
  let expression = `${branchName}:${entryPath.join("/") || ""}`;

  const [result] = useRepoTreeQuery({
    variables: {
      owner: owner as string,
      name: name as string,
      path: expression,
    },
  });

  const { data, error, fetching } = result;

  let object = data?.repository?.object as TreeFieldsFragment;

  let sortedEntries = useMemo(
    () => orderBy(object?.entries, "type", ["desc"]),
    [object?.entries]
  );

  const fullGithubViewUrl = `${GITHUB_URL}/${entryType}/${branchName}/${entryPath.join(
    "/"
  )}`;

  const right = useMemo(
    () => (
      <a href={fullGithubViewUrl} target="_blank" rel="noreferrer">
        <IoLogoGithub size={20} />
      </a>
    ),
    [fullGithubViewUrl]
  );

  const left = useMemo(() => <div>{entryPath.join("/")}</div>, [entryPath]);

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