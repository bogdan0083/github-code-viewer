import { useRouter } from "next/router";
import { IoDocumentOutline, IoLogoGithub } from "react-icons/io5";
import { GITHUB_URL } from "../../../lib/utils/constants";
import {
  FileFieldsFragment,
  useRepoBlobQuery,
} from "../../../__generated__/graphql";
import { useEffect, useMemo, useState } from "react";
import { RepoPageQueryParams } from "../../../lib/utils/types";
import Topline from "../../common/Topline/Topline";
import CodeFragment from "../../code/CodeFragment/CodeFragment";
import RepoBreadcrumbs from "../RepoBreadcrumbs/RepoBreadcrumbs";
import ThemedButton from "@components/common/ThemedButton/ThemedButton";
import clsx from "clsx";
import { PaletteMode, usePaletteMode } from "@lib/context/paletteModeContext";
import { prepareMarkdown } from "@lib/utils/prepareMarkdown";

const RepoFileView = () => {
  const [paletteMode] = usePaletteMode();
  const router = useRouter();
  const { owner, name, path = [] } = router.query as RepoPageQueryParams;

  const fileExtensionSplit = path[path.length - 1].split(".");
  const fileExtension = fileExtensionSplit[fileExtensionSplit.length - 1];
  const isMarkdownFile = fileExtension === "md";

  const [fileHtmlContents, setFileHtmlContents] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [mdPreviewVisible, setMdPreviewVisible] =
    useState<boolean>(isMarkdownFile);
  const [mdPreviewContents, setMdPreviewContents] = useState<
    string | undefined
  >(undefined);

  const branchName = path[1];

  let entryPath = path.slice(2);
  let expression = `${branchName}:${entryPath.join("/") || ""}`;
  console.log(expression);

  const [result] = useRepoBlobQuery({
    variables: {
      owner: owner as string,
      name: name as string,
      path: expression,
      pathLowercase: expression.toLowerCase(),
    },
  });

  const { data, error, fetching } = result;

  console.log(result);

  let object =
    (data?.repository?.object as FileFieldsFragment) ||
    (data?.repository?.lowerCase as FileFieldsFragment);

  const fullPath = `${owner}/${name}/tree/${branchName}/${
    entryPath.join("/") || ""
  }`;

  const fullGithubViewUrl = `${GITHUB_URL}/${fullPath}`;
  const baseImgPath = `${GITHUB_URL}/${owner}/${name}/raw/${branchName}/`;

  const basePath = `${owner}/${name}/tree/${branchName}`;

  const left = useMemo(
    () => (
      <div className={"flex items-center"}>
        {<RepoBreadcrumbs path={["/", ...entryPath]} basePath={basePath} />}
      </div>
    ),
    [entryPath, basePath]
  );

  const mdPreviewButtonClassName = useMemo(
    () =>
      clsx({
        "w-9 h-9": true,
        "bg-gray-500 hover:bg-gray-600 border-transparent !text-white dark:bg-zinc-800 dark:border-zinc-700 dark:!text-inherit":
          paletteMode === PaletteMode.System && mdPreviewVisible,
      }),
    [mdPreviewVisible]
  );

  useEffect(() => {
    if (isMarkdownFile && object?.text) {
      const prepared = prepareMarkdown(object?.text, baseImgPath);
      setMdPreviewContents(prepared);
    }
  }, [isMarkdownFile, object]);

  const right = useMemo(
    () => (
      <>
        {isMarkdownFile && (
          <ThemedButton
            variant="outlined"
            className={mdPreviewButtonClassName}
            onClick={() => setMdPreviewVisible((prev) => !prev)}
            data-testid="MarkdownTogglePreviewButton"
          >
            <IoDocumentOutline size={20} />
          </ThemedButton>
        )}
        <a
          href={fullGithubViewUrl}
          target="_blank"
          rel="noreferrer"
          className={"shrink-0 block ml-3 mr-2 flex items-center"}
        >
          <IoLogoGithub size={20} />
        </a>
      </>
    ),
    [fullGithubViewUrl, mdPreviewVisible, setMdPreviewVisible, isMarkdownFile]
  );

  useEffect(() => {
    if (object?.text) {
      (async () => {
        try {
          const hljs = await import("highlightjs");
          if (typeof object.text === "string") {
            const html = hljs.highlight(fileExtension, object.text);
            setFileHtmlContents(html.value);
            setLanguage(html.language);
          }
        } catch (e) {
          setFileHtmlContents(object.text || null);
        }
      })();
    }
  }, [object?.text, fileExtension]);

  useEffect(() => {
    if (fetching && fileHtmlContents) {
      setFileHtmlContents(null);
      setLanguage(null);
    }
  }, [fetching, fileHtmlContents]);

  return (
    <div className={"flex flex-col max-h-full"} data-testid={"RepoFileView"}>
      <Topline left={left} right={right} className={"flex-shrink"} />
      <div className={"p-2 flex-grow overflow-auto max-h-full"}>
        {fetching ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : isMarkdownFile && mdPreviewVisible && mdPreviewContents ? (
          <div
            dangerouslySetInnerHTML={{ __html: mdPreviewContents }}
            className="prose prose-sm lg:prose-md 2xl:prose-lg dark:prose-invert mx-auto pt-5 lg:pt-9"
            data-testid="MarkdownPreview"
          ></div>
        ) : (
          fileHtmlContents && (
            <CodeFragment fileContents={fileHtmlContents} language={language} />
          )
        )}
      </div>
    </div>
  );
};

export default RepoFileView;
