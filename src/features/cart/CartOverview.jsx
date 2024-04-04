import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-800 uppercase px-4 text-sm md:text-base py-4 text-stone-200 sm:px-6">
      <p className="text-stone-300 space-x-4 ms:space-x-6 font-semibold">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
