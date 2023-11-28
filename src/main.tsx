import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeObj } from 'router/router.tsx';
import { store } from 'store/store';
import './style/index.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { injectStore } from '~utils/helpers';

injectStore(store);
const router = createBrowserRouter(routeObj);

ReactDOM.hydrateRoot(document.getElementById('root')!,
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
);
