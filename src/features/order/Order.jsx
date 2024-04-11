// Test ID: IIDSAT

import { getOrder } from "../../services/apiRestaurant";
import { formatCurrency } from "../../ultilities/helpers";
import { formatDate } from "../../ultilities/helpers";
import { calcMinutesLeft } from "../../ultilities/helpers";
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from '../order/OrderItem'
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

// import {
//   calcMinutesLeft,
//   formatCurrency,
//   formatDate,
// } from "../../utils/helpers";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const fetcher = useFetcher();

  useEffect(function () {
    if(!fetcher.data && fetcher.state === 'idle')
    fetcher.load('/menu');
  }, [fetcher])
  


  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2 ">
        <h2 className="text-xl font-semibold mb-4 sm:mb-0">order #{id} status</h2>

        <div className="space-x-2 ">
          {true && (<span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-red-50">Priority</span>)}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 px-5">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500 ">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t ">
        {cart.map(item=> <OrderItem key={item.pizzaId} item={item} ingredients={fetcher?.data?.find(el=> el.id === item.pizzaId)?.ingredients ?? []} isLoadingIngredients={fetcher.state === 'loading'} />)}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5 ">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
