import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";

import store from '../../Store';
import { formatCurrency } from "../../ultilities/helpers";

import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const {userName, status: addressStatus, position, address, error: errorAddress
  } = useSelector(store => store.user);
  
  const isLoadingAddress = address === 'loading';

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart)

  const totalCartPrice = useSelector(getTotalCartPrice);

  const dispatch = useDispatch();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;




  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 font-semibold text-xl ">Ready to order? Let go!</h2>

      

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required defaultValue={userName} className="input grow "  />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && <p className=" text-xs p-2 mt-2 text-red-700 bg-red-100 rounded-md">{formErrors.phone}</p>}
          </div>
          
        </div>

        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address"
              className="input w-full" required
              defaultValue={ address}
            />
             {addressStatus === 'error' && <p className=" text-xs p-2 mt-2 text-red-700 bg-red-100 rounded-md">{errorAddress}</p>}
          </div>

          {!position?.latitude && !position?.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                  console.log(errorAddress)
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none 
            focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to give your a order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name='position' value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ''} />
          <Button type='primary' disabled={isSubmitting || isLoadingAddress} >
            {isSubmitting ? "placing order...." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);



  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number. We might need to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // if everything is okay, then run this code below which create a new order and redirect

  const newOrder = await createOrder(order);


  //do not over-use
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
