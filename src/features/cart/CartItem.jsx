import { memo } from 'react';

import { useSelector } from 'react-redux';

import { getQuantityById } from './cartSlice.js';
import DeleteItem from './DeleteItem.jsx';
import UpdateItemQuantity from './UpdateItemQuantity.jsx';
import { formatCurrency } from '../../utils/helpers.js';

const CartItem = memo(function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currQuantity = useSelector(getQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currQuantity={currQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
});

export default CartItem;
