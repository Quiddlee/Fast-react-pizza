import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem.jsx";
import { clearCart, getCart } from "./cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";
import Button from "../../ui/Button.jsx";
import LinkButton from "../../ui/LinkButton.jsx";
import { getUserName } from "../user/userSlice.js";

function Cart() {
  const userName = useSelector(getUserName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const noCart = !cart.length;

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  if (noCart) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button onClick={handleClearCart} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
