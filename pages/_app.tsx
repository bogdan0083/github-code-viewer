import "../styles/globals.css";
import type { AppProps } from "next/app";
import withUrqlGithubClient from "../lib/utils/withUrqlGithubClient";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { initServiceWorker } from "../__tests__/__mocks__/serviceWorker";

export type NextPageWithLayout<P, IP> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any, any>;
};

if (process.env.NODE_ENV === "development") {
  (async () => {
    await initServiceWorker();
  })();
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default withUrqlGithubClient(MyApp);
