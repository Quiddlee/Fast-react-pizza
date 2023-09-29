import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from '../../ui/Button.jsx';
import { formatCurrency } from '../../utils/helpers.js';
import { addItem, getQuantityById } from '../cart/cartSlice.js';
import DeleteItem from '../cart/DeleteItem.jsx';
import UpdateItemQuantity from '../cart/UpdateItemQuantity.jsx';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currQuantity = useSelector(getQuantityById(id));

  const isInCart = currQuantity > 0;
  let price;
  let priceClassName = 'text-sm';
  let imgClassName = 'max-h-24';

  if (soldOut) {
    price = 'Sold out';
    priceClassName += ' font-medium uppercase text-stone-500';
    imgClassName += ' opacity-70 grayscale';
  }

  if (!soldOut) {
    price = formatCurrency(unitPrice);
  }

  const handleAddToCart = useCallback(() => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }, [dispatch, id, name, unitPrice]);

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={imgClassName} />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className={priceClassName}>{price}</p>

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity pizzaId={id} currQuantity={currQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
