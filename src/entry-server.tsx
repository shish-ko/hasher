import ReactDOMServer from 'react-dom/server';
import { routeObj } from 'router/router.tsx';
import { store } from 'store/store';
import './style/index.scss';
import { StaticHandlerContext, StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { injectStore } from '~utils/helpers';
import createFetchRequest from '~utils/reqest';
import { Request } from 'express';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from 'style/MUI_theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
// import fetch, { Response } from 'node-fetch';

injectStore(store);

export async function render(req: Request) {
  // router ssr
  const { query, dataRoutes } = createStaticHandler(routeObj);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);


  // If we got a redirect response, short circuit and const our Express server
  // handle that directly
  // if (context instanceof Response) {
  //   throw context;
  // }

  const router = createStaticRouter(dataRoutes, context as StaticHandlerContext);
  // MUI ssr
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <StaticRouterProvider
            router={router}
            context={context as StaticHandlerContext}
            />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
  
  const emotionChunks = extractCriticalToChunks(appHtml);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  return {appHtml, emotionCss};
}
