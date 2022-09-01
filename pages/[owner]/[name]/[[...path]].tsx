import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import SidenavLayout from "@components/layouts/sidenavLayout";
import RepoExplorerSideView from "@components/repos/RepoEntries/RepoSideView";
import RepoDirectoryView from "@components/repos/RepoDirectoryView/RepoDirectoryView";
import { RepoPageQueryParams } from "@lib/utils/types";
import RepoFileView from "@components/repos/RepoFileView/RepoFileView";
import { NextPageContext } from "next";
import { ReactElement } from "react";
import Favicon from "@components/common/Favicon/Favicon";

type Props = {
  title: string;
};

const RepoEntryPage: NextPageWithLayout<any, Props> = ({ title }) => {
  const router = useRouter();
  const { path = [] } = router.query as RepoPageQueryParams;

  const entryType = path[0];

  // Check if the current path is a file.
  // For example vim/hello/src/main.c
  const isFile = entryType === "blob";

  return (
    <>
      <Head>
        <title>{title} | Github Code Viewer</title>
        <meta name="description" content="RepoPage" />
        <Favicon />
      </Head>
      {isFile ? <RepoFileView /> : <RepoDirectoryView />}
    </>
  );
};

RepoEntryPage.getLayout = function (page: ReactElement) {
  return (
    <SidenavLayout sideNavContent={<RepoExplorerSideView />}>
      {page}
    </SidenavLayout>
  );
};

RepoEntryPage.getInitialProps = function (ctx: NextPageContext): Props {
  const { owner, name, path } = ctx.query as RepoPageQueryParams;
  const entryPath = path?.slice(2);
  let title = `${owner}/${name}`;
  if (entryPath && entryPath.length > 0) {
    title += `/${entryPath.join("/")}`;
  }
  return { title };
};

export default RepoEntryPage;
