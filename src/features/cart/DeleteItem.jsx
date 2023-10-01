import { memo, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { deleteItem } from './cartSlice.js';
import Button from '../../ui/Button.jsx';

const DeleteItem = memo(function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  const handleDeleteItem = useCallback(
    () => dispatch(deleteItem(pizzaId)),
    [dispatch, pizzaId],
  );

  return (
    <Button onClick={handleDeleteItem} type="small">
      Delete
    </Button>
  );
});

export default DeleteItem;
