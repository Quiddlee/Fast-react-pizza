import { memo } from 'react';

import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header.jsx';
import Loader from './Loader.jsx';
import CartOverview from '../features/cart/CartOverview.jsx';

const LOADING_STATE = 'loading';

const AppLayout = memo(function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === LOADING_STATE;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-scroll">
        <main className="m-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
});

export default AppLayout;
