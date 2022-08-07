import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import Head from "next/head";
import DefaultLayout from "../../components/layouts/defaultLayout";
import ReposView from "../../components/repos/ReposView/ReposView";

type SearchPageRouteParams = {
  q: string;
};

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { q } = router.query as SearchPageRouteParams;
  const title = `Search results for: ${q}`;
  console.log(q);
  return (
    <>
      <Head>
        <title>Search | Github Code Viewer</title>
        <meta name="description" content="Search results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="container mx-auto px-3 pt-8">
          <ReposView title={title} query={q} />
        </div>
      </div>
    </>
  );
};

SearchPage.getLayout = function (page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default SearchPage;
