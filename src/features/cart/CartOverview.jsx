import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from "./CartSlice";
import { formatCurrency } from "../../ultilities/helpers";


function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice)

  if (!totalCartQuantity) return null;
  return (
    <div className="bg-stone-800 uppercase px-4 text-sm md:text-base py-4 text-stone-200 sm:px-6 flex items-center justify-between">
      <p className="text-stone-300 space-x-4 ms:space-x-6 font-semibold">
        <span>{totalCartQuantity} pizzas</span>
        <span>{ formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
