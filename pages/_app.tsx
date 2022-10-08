import Head from "next/head";
import type { AppProps } from "next/app";
import React, { createContext, useEffect } from "react";
import { Provider } from "react-redux";
import { Auth } from "../auth/Auth";
import { store } from "../redux/store";
import "../styles/globals.css";
import { LoginForm } from "../Components/LoginForm";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";

export const TokenContext = createContext("");
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loginRequired, setLoginRequired] = React.useState(true);
  const [auth] = React.useState(new Auth());
  const [token, setToken] = React.useState("");

  /**
   * ログイン成功時
   */
  const handleFormComplete = () => {
    setLoginRequired(false);
  };

  useEffect(() => {
    (async () => {
      try {
        await auth.setUpAuth();
        const session = await auth.isLogined();
        setToken(session.getIdToken().getJwtToken());
        setLoginRequired(false);
      } catch (error) {
        console.log(
          "ログインが完了していません。ログインフォームに遷移します。",
          error
        );
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!loginRequired)
        setToken((await auth.isLogined()).getIdToken().getJwtToken());
    })();
  }, [loginRequired]);

  return (
    <CacheProvider value={emotionCache!}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <TokenContext.Provider value={token}>
            {isLoading && (
              <div className="w-screen h-screen flex justify-center items-center ">
                <CircularProgress className="[zoom:1.5]" />
              </div>
            )}
            {!isLoading && (
              <>
                {loginRequired && (
                  <LoginForm
                    onComplete={handleFormComplete}
                    auth={auth}
                  ></LoginForm>
                )}
                {!loginRequired && <Component {...pageProps} />}
              </>
            )}
          </TokenContext.Provider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
