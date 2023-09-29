import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { decreaseQuantity, increaseQuantity } from './cartSlice.js';
import Button from '../../ui/Button.jsx';

function UpdateItemQuantity({ pizzaId, currQuantity }) {
  const dispatch = useDispatch();

  const handleDecrease = useCallback(() => {
    dispatch(decreaseQuantity(pizzaId));
  }, [dispatch, pizzaId]);

  const handleIncrease = useCallback(() => {
    dispatch(increaseQuantity(pizzaId));
  }, [dispatch, pizzaId]);

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
      <span className="text-sm font-medium">{currQuantity}</span>
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
