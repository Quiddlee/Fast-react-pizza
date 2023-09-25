import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Cart from './features/cart/Cart.jsx';
import Menu from './features/menu/Menu.jsx';
import CreateOrder from './features/order/CreateOrder.jsx';
import OrderItem from './features/order/OrderItem.jsx';
import Home from './ui/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/order/new',
    element: <CreateOrder />,
  },
  {
    path: '/order/:orderId',
    element: <OrderItem />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
