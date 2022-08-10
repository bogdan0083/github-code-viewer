import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import SidenavLayout from "../../../components/layouts/sidenavLayout";
import RepoExplorerSideView from "../../../components/repos/RepoEntries/RepoEntriesView";
import RepoExplorerDirectoryView from "../../../components/repos/RepoExplorerMainView/RepoExplorerDirectoryView";
import { RepoPageQueryParams } from "../../../lib/utils/types";
import RepoExplorerFileView from "../../../components/repos/RepoExplorerFileView/RepoExplorerFileView";
import { NextPageContext } from "next";
import { ReactElement } from "react";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isFile ? <RepoExplorerFileView /> : <RepoExplorerDirectoryView />}
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
  return { title: `${owner}/${name}/${path?.join("/") || ""}` };
};

export default RepoEntryPage;
