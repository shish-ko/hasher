import './style/index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { injectStore } from '~utils/helpers';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from 'style/MUI_theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'createEmotionCache';
import { store } from 'store/store';
import { routeObj } from 'router/router';
import { hydrateRoot } from 'react-dom/client';

injectStore(store);
const router = createBrowserRouter(routeObj);
const cache = createEmotionCache();
hydrateRoot(document.getElementById('root')!,
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
