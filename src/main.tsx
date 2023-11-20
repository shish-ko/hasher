import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from 'router/router.tsx';
import { store } from 'store/store';
import './style/index.scss';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
);
