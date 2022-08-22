import { useRouter } from "next/router";
import { IoLogoGithub } from "react-icons/io5";
import { GITHUB_URL } from "../../../lib/utils/constants";
import {
  TreeFieldsFragment,
  useRepoTreeQuery,
} from "../../../__generated__/graphql";
import { useEffect, useMemo, useState } from "react";
import orderBy from "lodash.orderby";
import RepoEntries from "../RepoEntries/RepoEntries";
import { RepoPageQueryParams } from "../../../lib/utils/types";
import Topline from "../../common/Topline/Topline";
import RepoBreadcrumbs from "../RepoBreadcrumbs/RepoBreadcrumbs";

const RepoDirectoryView = () => {
  const router = useRouter();
  const { owner, name, path = [] } = router.query as RepoPageQueryParams;
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    // @TODO: This is a hack to get the mobile view to work.
    // Ideally we want to use constants with
    const mql = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (mediaQueryList: MediaQueryList) => {
      setIsMobile(mediaQueryList.matches);
    };

    handleMediaQueryChange(mql);
    // @ts-ignore
    mql.addEventListener("change", handleMediaQueryChange);

    return () => {
      // @ts-ignore
      mql.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const { data, error, fetching } = result;

  if (error) {
    throw error;
  }

  let object = data?.repository?.object as TreeFieldsFragment;

  let sortedEntries = useMemo(
    () => orderBy(object?.entries, "type", ["desc"]),
    [object?.entries]
  );

  const fullGithubViewUrl = `${GITHUB_URL}/${owner}/${name}/${entryType}/${branchName}/${entryPath.join(
    "/"
  )}`;

  const basePath = `${owner}/${name}/${entryType}/${branchName}`;

  const right = useMemo(
    () => (
      <a
        href={fullGithubViewUrl}
        target="_blank"
        rel="noreferrer"
        className={"shrink-0 block ml-3"}
      >
        <IoLogoGithub size={20} />
      </a>
    ),
    [fullGithubViewUrl]
  );

  const left = useMemo(
    () => (
      <div className={"flex items-center"}>
        <RepoBreadcrumbs path={["/", ...entryPath]} basePath={basePath} />
      </div>
    ),
    [entryPath, basePath]
  );

  return (
    <div className={"flex flex-col max-h-full"} data-testid="RepoDirectoryView">
      <Topline left={left} right={right} className={"flex-shrink"} />
      <div className={"p-2 flex-grow max-h-full"}>
        <RepoEntries
          showBackFolder={isMobile && entryPath.length > 0}
          size={"sm"}
          entries={sortedEntries}
          currentPath={entryPath}
          isLoading={fetching}
        />
      </div>
    </div>
  );
};

export default RepoDirectoryView;
