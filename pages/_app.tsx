import "../styles/globals.css";
import type { AppProps } from "next/app";
import withUrqlGithubClient from "../utils/withUrqlGithubClient";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default withUrqlGithubClient(MyApp);
