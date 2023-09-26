// https://uibakery.io/regex-library/phone-number
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { createOrder } from '../../services/apiRestaurant.js';

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
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div>
          <label htmlFor="customer">
            First Name
            <input type="text" name="customer" required />
          </label>
        </div>

        <div>
          <label htmlFor="phone">
            Phone number
            <div>
              <input type="tel" name="phone" required />
            </div>
            {formErrors?.phone && <p>{formErrors.phone}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="address">
            Address
            <div>
              <input type="text" name="address" required />
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="priority">
            <input
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
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </button>
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
