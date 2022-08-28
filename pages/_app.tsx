import "../styles/globals.css";
import type { AppProps } from "next/app";
import withUrqlGithubClient from "@lib/utils/withUrqlGithubClient";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";

export type NextPageWithLayout<P, IP> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any, any>;
};

const API_MOCKING = process?.env.NEXT_PUBLIC_API_MOCKING === "true" || false;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [shouldRender, setShouldRender] = useState(!API_MOCKING);

  useEffect(() => {
    async function initMocks() {
      const setupMocks = (await import("../__tests__/__mocks__/setupMocks"))
        .default;
      await setupMocks();
      setShouldRender(true);
    }

    if (API_MOCKING) {
      initMocks();
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return getLayout(<Component {...pageProps} />);
}

export default withUrqlGithubClient(MyApp);
