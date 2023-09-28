import Button from '../../ui/Button.jsx';
import { formatCurrency } from '../../utils/helpers.js';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
          <Button type="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
