import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { loader as menuLoader } from './features/menu/loader.js';
import { loader as orderLoader } from './features/order/loader';
import { action as updateOrderAction } from './features/order/UpdateOrder.jsx';
import AppLayout from './ui/AppLayout.jsx';
import Error from './ui/Error.jsx';

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          lazy: () => import('./ui/Home.jsx'),
        },
        {
          path: '/menu',
          lazy: () => import('./features/menu/Menu.jsx'),
          loader: menuLoader,
          errorElement: <Error />,
        },
        {
          path: '/cart',
          lazy: () => import('./features/cart/Cart.jsx'),
        },
        {
          path: '/order/new',
          lazy: () => import('./features/order/CreateOrder.jsx'),
        },
        {
          path: '/order/:orderId',
          lazy: () => import('./features/order/Order.jsx'),
          loader: orderLoader,
          errorElement: <Error />,
          action: updateOrderAction,
        },
      ],
    },
  ],
  {
    basename: '/Fast-react-pizza',
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
