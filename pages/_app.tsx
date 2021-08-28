import { AppProps } from "next/app";
import Header from "../components/header/Header";
import GlobalStyle from "../style/GlobalStyle";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default app;
