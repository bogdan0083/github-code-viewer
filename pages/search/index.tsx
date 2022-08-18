import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultLayout from "../../components/layouts/defaultLayout";
import RepoListView from "../../components/repos/RepoListView/RepoListView";
import Favicon from "../../components/common/Favicon/Favicon";

type SearchPageRouteParams = {
  q: string;
};

const SearchPage: NextPageWithLayout<any, {}> = () => {
  const router = useRouter();
  const { q } = router.query as SearchPageRouteParams;
  const title = `Search results for: ${q}`;
  return (
    <>
      <Head>
        <title>Search | Github Code Viewer</title>
        <meta name="description" content="Search results" />
        <Favicon />
      </Head>
      <div>
        <div className="container mx-auto px-3 pt-8">
          <RepoListView title={title} query={q} />
        </div>
      </div>
    </>
  );
};

SearchPage.getLayout = function (page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default SearchPage;
