import { useLoaderData } from 'react-router-dom';

import MenuItem from './MenuItem.jsx';
import { getMenu } from '../../services/apiRestaurant.js';

function Menu() {
  const menu = useLoaderData();

  return menu.map((pizza) => <MenuItem key={pizza.id} pizza={pizza} />);
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
