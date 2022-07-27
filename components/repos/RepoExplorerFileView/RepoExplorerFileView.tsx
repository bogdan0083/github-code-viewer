import { useRouter } from "next/router";
import { IoLogoGithub } from "react-icons/io5";
import { GITHUB_URL } from "../../../lib/utils/constants";
import {
  FileFieldsFragment,
  useRepoTreeQuery,
} from "../../../generated/graphql";
import { useMemo } from "react";
import { RepoPageQueryParams } from "../../../lib/utils/types";
import Topline from "../../common/Topline/Topline";
import CodeFragment from "../../code/CodeFragment/CodeFragment";

const RepoExplorerFileView = () => {
  const router = useRouter();
  const { owner, name, path = [] } = router.query as RepoPageQueryParams;

  const fileExtensionSplit = path[path.length - 1].split(".");
  const fileExtension = fileExtensionSplit[fileExtensionSplit.length - 1];
  const slicedPath = path?.join("/");

  const [result] = useRepoTreeQuery({
    variables: {
      owner: owner as string,
      name: name as string,
      path: `HEAD:${slicedPath || ""}`,
    },
  });

  const { data, error, fetching } = result;

  let object = data?.repository?.object as FileFieldsFragment;

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
        {fetching ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <CodeFragment
            fileContents={object.text ?? ""}
            language={fileExtension}
          />
        )}
      </div>
    </div>
  );
};

export default RepoExplorerFileView;
