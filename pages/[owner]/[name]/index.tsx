import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import SidenavLayout from "../../../components/layouts/sidenav";
import FileExplorer from "../../../components/repos/FileExplorer/FileExplorer";

const RepoPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { owner } = router.query;
  const { name } = router.query;

  return (
    <>
      <Head>
        <title>RepoPage - Github Code Viewer</title>
        <meta name="description" content="RepoPage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={"text-3xl"}>Repo owner: {owner}</h1>
      <h2 className={"text-3xl"}>Repo name: {name}</h2>
    </>
  );
};

RepoPage.getLayout = function (page) {
  return (
    <SidenavLayout sideNavContent={<FileExplorer />}>{page}</SidenavLayout>
  );
};

export default RepoPage;
