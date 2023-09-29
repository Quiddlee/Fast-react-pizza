// https://uibakery.io/regex-library/phone-number
import { useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { createOrder } from '../../services/apiRestaurant.js';
import Button from '../../ui/Button.jsx';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const PHONE_ERROR =
  'Please give us your correct phone number, we might need it to contact you.';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetable',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const formErrors = useActionData();
  const userName = useSelector((store) => store.user.userName);

  const isSubmitting = navigation.state === 'submitting';

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

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
            className="flex flex-col sm:flex-row sm:items-center"
            htmlFor="address">
            <span className="sm:basis-40">Address</span>
            <div className="grow">
              <input
                className="input w-full"
                type="text"
                name="address"
                required
              />
            </div>
          </label>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <label className="font-medium" htmlFor="priority">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              type="checkbox"
              name="priority"
              id="priority"
              // value={withPriority}
              // onChange={(e) => setWithPriority(e.target.checked)}
            />
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now'}
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
    priority: data.priority === 'on',
  };

  if (!isValidPhone(order.phone)) errors.phone = PHONE_ERROR;
  if (Object.keys(errors).length > 0) return errors;

  // If everything is ok, create new order and redirect
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}/`);
}

export default CreateOrder;
