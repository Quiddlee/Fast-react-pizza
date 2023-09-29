import { useSelector } from 'react-redux';

import { getUserName } from './userSlice.js';

function Username() {
  const userName = useSelector(getUserName);

  if (!userName) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
}

export default Username;
