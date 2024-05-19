import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.hook';
import { getSession } from './session.utilities';

const ProtectedRoute = () => {
  const auth = useAuth();
  if (!auth.user || !getSession().accessToken) return <Navigate to="/login" />;
  return <Outlet />;
};

const NoProtectedRoute = () => {
  const auth = useAuth();
  if (auth.user && getSession().accessToken) return <Navigate to="/" />;
  return <Outlet />;
};

export { ProtectedRoute, NoProtectedRoute };
