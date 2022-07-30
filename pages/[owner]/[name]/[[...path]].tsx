import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import SidenavLayout from "../../../components/layouts/sidenavLayout";
import RepoExplorerSideView from "../../../components/repos/RepoEntries/RepoEntriesView";
import RepoExplorerDirectoryView from "../../../components/repos/RepoExplorerMainView/RepoExplorerDirectoryView";
import { RepoPageQueryParams } from "../../../lib/utils/types";
import RepoExplorerFileView from "../../../components/repos/RepoExplorerFileView/RepoExplorerFileView";

const RepoEntryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { owner, name, path = [] } = router.query as RepoPageQueryParams;
  const ownerWithName = `${owner}/${name}`;
  const title = path ? `${ownerWithName}/${path.join("/")}` : ownerWithName;

  // Check if the current path is a file.
  // For example vim/hello/src/main.c
  const isFile = path[path.length - 1]?.includes(".");
  console.log(path);

  return (
    <>
      <Head>
        <title>{title} - Github Code Viewer</title>
        <meta name="description" content="RepoPage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isFile ? <RepoExplorerFileView /> : <RepoExplorerDirectoryView />}
    </>
  );
};

RepoEntryPage.getLayout = function (page) {
  return (
    <SidenavLayout
      sideNavContent={
        <div className={"h-full w-full w-[inherit]"}>
          <RepoExplorerSideView />
        </div>
      }
    >
      {page}
    </SidenavLayout>
  );
};

export default RepoEntryPage;
