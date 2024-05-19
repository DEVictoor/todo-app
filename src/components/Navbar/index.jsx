import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { setTheme } from '../../store/slices/theme.slice';
import { useAuth } from '../../hooks/useAuth.hook';
import { useClickOutside } from '../../hooks/useClickOutside';

const Navbar = ({ isCollapse, setIsCollapse }) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [activeDropdown, setActiveDropdown] = useState(false);
  const theme = useSelector(state => state.theme.current);

  const handleChangeTheme = string => dispatch(setTheme(string));

  const dropdownRef = useClickOutside(() => setActiveDropdown(false));

  return (
    <nav className="fixed w-full z-50 pr-4 bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700">
      <div className="flex flex-wrap items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-secondary-500 rounded hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-200 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:focus:ring-secondary-600"
            onClick={() => setIsCollapse(!isCollapse)}
          >
            <GiHamburgerMenu size={24} />
          </button>
          <Link to="/">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              KokoVet - βeta
            </span>
          </Link>
        </div>
        <div className="flex space-x-4">
          {theme === 'dark' && (
            <button
              className={`inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-secondary-500 rounded-lg hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-200 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:focus:ring-secondary-600 transition-colors duration-300 transform rotate-0`}
              onClick={() => handleChangeTheme('light')}
            >
              <IoMdSunny size={24} />
            </button>
          )}
          {theme === 'light' && (
            <button
              className={`inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-secondary-500 rounded-lg hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-secondary-200 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:focus:ring-secondary-600 transition-colors duration-300 transform rotate-360`}
              onClick={() => handleChangeTheme('dark')}
            >
              <IoMdMoon size={24} />
            </button>
          )}
          <div
            ref={dropdownRef}
            className="relative flex items-center space-x-3 md:space-x-0 md:order-2 rtl:space-x-reverse"
          >
            <button
              className="flex text-sm rounded-full md:me-0 bg-secondary-800 focus:ring-4 focus:ring-secondary-300 dark:focus:ring-secondary-600"
              onClick={() => setActiveDropdown(!activeDropdown)}
            >
              <div className="relative w-8 h-8 bg-secondary-100 dark:bg-secondary-600 rounded-full overflow-hidden">
                <svg
                  className="absolute w-auto h-auto text-secondary-400 -bottom-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
            <div
              className={`absolute top-8 right-0 z-50 my-4 w-48 text-base list-none bg-white divide-y divide-secondary-100 rounded-lg shadow dark:bg-secondary-700 dark:divide-secondary-600 ${
                activeDropdown ? '' : 'hidden'
              }`}
            >
              <div className="px-4 py-3">
                {auth.user?.firstName && (
                  <span className="block text-sm text-secondary-900 dark:text-white">
                    {`${auth.user?.firstName} ${auth.user?.lastName}`}
                  </span>
                )}
                {auth.user?.email && (
                  <span className="block text-sm text-secondary-500 truncate dark:text-secondary-400">
                    {auth.user?.email}
                  </span>
                )}
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:text-secondary-200 dark:hover:text-white"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full px-4 py-2 text-sm text-left text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:text-secondary-200 dark:hover:text-white"
                    onClick={auth.logout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  options: PropTypes.array,
  isCollapse: PropTypes.bool,
  setIsCollapse: PropTypes.func
};

export { Navbar };
