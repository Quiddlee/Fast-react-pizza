import { Outlet } from 'react-router-dom';

import Header from './Header.jsx';
import CartOverview from '../features/cart/CartOverview.jsx';

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
