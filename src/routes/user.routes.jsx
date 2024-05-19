import { Route } from 'react-router-dom';
import Users from '../pages/Users';

const UsersRoutes = () => {
  return (
    <>
      <Route path="users" element={<Users />} />
    </>
  );
};

export { UsersRoutes };
