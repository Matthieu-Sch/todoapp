import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "../reducers/auth";
// Imports de redux persist
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage"; // Utilise localStorage pour les applications web
import { useRouter } from "next/router";
import { useEffect } from "react";

// Paramétrage de redux persist
const reducers = combineReducers({ auth });
const persistConfig = { key: "todo-app", storage: storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function AuthVerification({ children }) {
  const router = useRouter();
  const isConnected = useSelector((state) => state.auth.isConnected);

  useEffect(() => {
    const publicRoutes = ["/", "/auth/signup", "/auth/login"]; // Routes accessibles sans connexion
    if (!isConnected && !publicRoutes.includes(router.pathname)) {
      router.push("/");
    }
  }, [isConnected, router]);

  return children;
}

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Todo App</title>
        </Head>
        <Layout>
          <AuthVerification>
            <Component {...pageProps} />
          </AuthVerification>
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App;
