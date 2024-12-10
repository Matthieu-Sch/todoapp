import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from "../reducers/auth";

const store = configureStore({
  reducer: { auth },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Todo App</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
