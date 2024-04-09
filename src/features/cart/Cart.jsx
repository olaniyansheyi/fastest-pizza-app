import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../cart/CartItem'
import { useSelector,useDispatch } from 'react-redux';
import { clearCart, getCart } from './CartSlice';
import EmptyCart from './EmptyCart'


function Cart() {
  const cart = useSelector(getCart);
  const dispach = useDispatch();
  const userName = useSelector(store => store.user.userName);

  if(!cart.length) return <EmptyCart />
 


  return (
    <div className=' px-4 py-3'>
      <LinkButton to="/menu" >&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, { userName}</h2>

      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map(item => < CartItem item={item} key={item.key} />)}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button type='primary' to="/order/new">Order pizza</Button>
        <Button type='secondary' onClick={()=> dispach(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
