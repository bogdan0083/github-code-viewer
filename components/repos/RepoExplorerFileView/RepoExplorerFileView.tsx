import { useRouter } from "next/router";
import { IoLogoGithub } from "react-icons/io5";
import { GITHUB_URL } from "../../../lib/utils/constants";
import {
  FileFieldsFragment,
  useRepoTreeQuery,
} from "../../../generated/graphql";
import { useEffect, useMemo, useState } from "react";
import { RepoPageQueryParams } from "../../../lib/utils/types";
import Topline from "../../common/Topline/Topline";
import CodeFragment from "../../code/CodeFragment/CodeFragment";
import hljs from "highlightjs";

const RepoExplorerFileView = () => {
  const router = useRouter();
  const { owner, name, path = [] } = router.query as RepoPageQueryParams;
  const [fileHtmlContents, setFileHtmlContents] = useState<string | null>(null);

  const fileExtensionSplit = path[path.length - 1].split(".");
  const fileExtension = fileExtensionSplit[fileExtensionSplit.length - 1];
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

  let object = data?.repository?.object as FileFieldsFragment;

  const fullPath = `${owner}/${name}/tree/${branchName}/${
    entryPath.join("/") || ""
  }`;

  const fullGithubViewUrl = `${GITHUB_URL}/${fullPath}`;

  const left = useMemo(
    () => <div className={"flex items-center"}>{entryPath.join("/")}</div>,
    [entryPath]
  );

  const right = useMemo(
    () => (
      <a href={fullGithubViewUrl} target="_blank" rel="noreferrer">
        <IoLogoGithub size={20} />
      </a>
    ),
    [fullGithubViewUrl]
  );

  useEffect(() => {
    if (object?.text) {
      try {
        const html = hljs.highlight(fileExtension, object.text);
        setFileHtmlContents(html.value);
      } catch (e) {
        setFileHtmlContents(object.text);
      }
    }
  }, [object?.text, fileExtension]);

  useEffect(() => {
    if (fetching) {
      setFileHtmlContents(null);
    }
  }, [fetching]);

  return (
    <div>
      <Topline left={left} right={right} />
      <div className={"p-2"}>
        {fetching ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          fileHtmlContents && (
            <CodeFragment
              fileContents={fileHtmlContents}
              language={fileExtension}
            />
          )
        )}
      </div>
    </div>
  );
};

export default RepoExplorerFileView;
