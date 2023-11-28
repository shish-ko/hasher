import ReactDOMServer from 'react-dom/server';
import { routeObj } from 'router/router.tsx';
import { store } from 'store/store';
import './style/index.scss';
import { StaticHandlerContext, StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { injectStore } from '~utils/helpers';
import createFetchRequest from '~utils/reqest';
import { Request } from 'express';
// import fetch, { Response } from 'node-fetch';

injectStore(store);

export async function render(req: Request) {
  const { query, dataRoutes } = createStaticHandler(routeObj);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  // If we got a redirect response, short circuit and const our Express server
  // handle that directly
  // if (context instanceof Response) {
  //   throw context;
  // }

  const router = createStaticRouter(dataRoutes, context as StaticHandlerContext);
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouterProvider
        router={router}
        context={context as StaticHandlerContext}
      />
    </Provider>
  );
}
