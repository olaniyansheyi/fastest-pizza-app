import CreateUser from '../features/user/CreateUser';
import userSlice from '../features/user/userSlice';
import Button from './Button';
import { useSelector } from 'react-redux';


function Home() {
  const userName = useSelector(store => store.user.userName);
  return (
    <div className='my-10 sm:my-10 text-center px-4'>
      <h1 className=" text-xl font-semibold mb-8">
        The best pizza.
        <br />
       <span className="text-yellow-500 "> Straight out of the oven, straight to you.</span>
      </h1>
      {userName === '' ? <CreateUser /> : <Button to='/menu' type='primary'>Continue ordering, {userName}</Button>}
    </div>
  );
}

export default Home;
