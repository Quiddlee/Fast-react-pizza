import { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { createOrder } from '../../services/apiRestaurant.js';
import store from '../../store.js';
import Button from '../../ui/Button.jsx';
import { formatCurrency } from '../../utils/helpers.js';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import { fetchAddress, getUserName } from '../user/userSlice.js';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const PHONE_ERROR =
  'Please give us your correct phone number, we might need it to contact you.';

function CreateOrder() {
  const navigation = useNavigation();
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);

  const {
    status: addressStatus,
    position: { latitude, longitude },
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';
  const userGeoNotDefined = !latitude && !longitude;
  const userGeoDefined = !userGeoNotDefined;

  const cart = useSelector(getCart);
  const userName = useSelector(getUserName);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const isSubmitting = navigation.state === 'submitting';
  const totalPrice = totalCartPrice + priorityPrice;
  const noCart = !cart.length;

  const handleFetchAddress = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(fetchAddress());
    },
    [dispatch],
  );

  if (noCart) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 gap-2">
          <label
            className="flex flex-col sm:flex-row sm:items-center"
            htmlFor="customer">
            <span className="sm:basis-40">First Name</span>
            <input
              className="input grow"
              type="text"
              name="customer"
              defaultValue={userName}
              required
            />
          </label>
        </div>

        <div className="mb-5 gap-2">
          <label
            className="flex flex-col sm:flex-row sm:items-center"
            htmlFor="phone">
            <span className="sm:basis-40">Phone number</span>
            <div className="grow">
              <input
                className="input w-full"
                type="tel"
                name="phone"
                required
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-300 p-4 text-xs text-red-100">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </label>
        </div>

        <div className="mb-5 gap-2">
          <label
            className="relative flex flex-col sm:flex-row sm:items-center"
            htmlFor="address">
            <span className="sm:basis-40">Address</span>
            <div className="grow">
              <input
                disabled={isLoadingAddress}
                defaultValue={address}
                className="input w-full"
                type="text"
                name="address"
                required
              />
              {addressStatus === 'error' && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
            </div>

            {userGeoNotDefined && (
              <span className="absolute right-[5px] top-[3px] z-50 md:top-[5px]">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={handleFetchAddress}>
                  Get position
                </Button>
              </span>
            )}
          </label>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <label className="font-medium" htmlFor="priority">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={userGeoDefined ? `${latitude},${longitude}` : ''}
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {};

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  if (!isValidPhone(order.phone)) errors.phone = PHONE_ERROR;

  const errorsExist = Object.keys(errors).length > 0;
  if (errorsExist) return errors;

  // If everything is ok, create new order, clear cart and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse - will ignore some performance optimization
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}/`);
}

export default CreateOrder;
