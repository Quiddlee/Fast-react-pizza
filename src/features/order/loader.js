import { getMenu, getOrder } from '../../services/apiRestaurant.js';

export async function loader({ params }) {
  const waitOrder = getOrder(params.orderId);
  const waitMenu = getMenu();

  const [order, menu] = await Promise.all([waitOrder, waitMenu]);

  return [order, menu];
}
