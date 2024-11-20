import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
