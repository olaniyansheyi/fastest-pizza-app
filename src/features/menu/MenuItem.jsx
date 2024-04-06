import Button from "../../ui/Button";
import { formatCurrency } from "../../ultilities/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className={`flex gap-4 py-2 ${soldOut? 'opacity-70 grayscale': ''}`}>
      <img src={imageUrl} alt={name} className="h-24" />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium ">{name}</p>
        <p className="text-sm italic text-stone-600 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          <Button type='small'>Add to Cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
