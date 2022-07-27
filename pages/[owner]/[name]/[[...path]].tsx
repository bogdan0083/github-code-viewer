import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import SidenavLayout from "../../../components/layouts/sidenavLayout";
import RepoExplorerSideView from "../../../components/repos/RepoEntries/RepoEntriesView";
import RepoExplorerMainView from "../../../components/repos/RepoExplorerMainView/RepoExplorerMainView";

const RepoEntryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { owner, name, path } = router.query;

  return (
    <>
      <Head>
        <title>RepoPage - Github Code Viewer</title>
        <meta name="description" content="RepoPage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RepoExplorerMainView />
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
