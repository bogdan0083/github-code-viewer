import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import DefaultLayout from "../../components/layouts/default";

const Owner: NextPageWithLayout = () => {
  const router = useRouter();
  const { owner } = router.query;

  return (
    <>
      <Head>
        <title>Owner - Github Code Viewer</title>
        <meta name="description" content="Owner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={"text-3xl"}>Owner: {owner}</h1>
    </>
  );
};

Owner.getLayout = function (page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Owner;
