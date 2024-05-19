import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth.hook';
import { setTheme } from '../store/slices/theme.slice';
import {
  NoProtectedRoute,
  ProtectedRoute,
  setUserInstance
} from '../utilities';
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
// const Config = lazy(() => import('../pages/Config'));
const Categories = lazy(() => import('../pages/Categories'));
const Tasks = lazy(() => import('../pages/Tasks'));
import { UsersRoutes } from './user.routes';

const AppRoutes = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const element = document.documentElement;

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      if (theme === 'dark') element.classList.add('dark');
      dispatch(setTheme(theme));
    } else {
      dispatch(
        setTheme(
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        )
      );
    }
    // eslint-disable-next-line
  }, []);

  setUserInstance(auth);

  return (
    <Suspense>
      <Routes>
        <Route element={<NoProtectedRoute />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="categories" element={<Categories />} />
          {UsersRoutes()}
        </Route>
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </Suspense>
  );
};

export { AppRoutes };
