import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header.jsx';
import Loader from './Loader.jsx';
import CartOverview from '../features/cart/CartOverview.jsx';

const LOADING_STATE = 'loading';

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === LOADING_STATE;

  return (
    <div className="layout">
      {isLoading && <Loader />}

      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
