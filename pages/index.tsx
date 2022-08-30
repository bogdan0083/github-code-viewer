import Head from "next/head";
import RepoListView from "@components/repos/RepoListView/RepoListView";
import subDays from "date-fns/subDays";
import format from "date-fns/format";
import {NextPageWithLayout} from "./_app";
import DefaultLayout from "@components/layouts/defaultLayout";
import Favicon from "@components/common/Favicon/Favicon";

const Home: NextPageWithLayout<any, {}> = () => {
  const weekAgo = format(subDays(new Date(), 7), "yyyy-MM-dd");
  return (
    <>
      <Head>
        <title>Github Code Viewer</title>
        <meta
          name="description"
          content="Github Code Viewer - Search code quick and fast"
        />
        <Favicon />
      </Head>
      <div className="grid grid-cols-1 pt-8 gap-10 md:grid-cols-2 md:grid-rows-1 container mx-auto px-3">
        <RepoListView title={"Trending This Week"} created={weekAgo} />
        <RepoListView title={"Popular"} stars={1000} />
      </div>
    </>
  );
};

Home.getLayout = function (page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
