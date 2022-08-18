import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import DefaultLayout from "../../components/layouts/defaultLayout";
import Favicon from "../../components/common/Favicon/Favicon";

const Owner: NextPageWithLayout<any, {}> = () => {
  const router = useRouter();
  const { owner } = router.query;

  return (
    <>
      <Head>
        <title>Owner - Github Code Viewer</title>
        <meta name="description" content="Owner" />
        <Favicon />
      </Head>
      <h1 className={"text-3xl"}>Owner: {owner}</h1>
    </>
  );
};

export const getServerSideProps = async () => {
  return {
    notFound: true,
  };
};

Owner.getLayout = function (page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Owner;
