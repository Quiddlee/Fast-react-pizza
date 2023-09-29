import { useSelector } from 'react-redux';

import Button from './Button.jsx';
import CreateUser from '../features/user/CreateUser.jsx';
import { getUserName } from '../features/user/userSlice.js';

function Home() {
  const userName = useSelector(getUserName);

  const isUserExist = userName !== '';

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="container mb-4 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {isUserExist ? (
        <Button to="/menu" type="primary">
          Continue ordering, {userName}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
