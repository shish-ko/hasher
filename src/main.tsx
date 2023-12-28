import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeObj } from 'router/router.tsx';
import { store } from 'store/store';
import './style/index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { injectStore } from '~utils/helpers';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from 'style/MUI_theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'createEmotionCache';

injectStore(store);
const router = createBrowserRouter(routeObj);
const cache = createEmotionCache();
ReactDOM.hydrateRoot(document.getElementById('root')!,
  // <React.StrictMode>
  <Provider store={store}>
    <CacheProvider value={cache}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </CacheProvider>
  </Provider>
  // </React.StrictMode>,
);
