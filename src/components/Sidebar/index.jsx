import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

const Sidebar = ({ options, isCollapse, setIsCollapse }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    isCollapse && setActiveSubmenu(null);
  }, [isCollapse]);

  const handleShowHiden = e => {
    if (e.target === e.currentTarget) setIsCollapse(true);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-20 w-screen h-screen ${
        isCollapse ? 'hidden lg:flex lg:w-16' : 'lg:w-64'
      } transition-none duration-0 lg:transition-all lg:duration-300 bg-opacity-50 dark:bg-opacity-90 bg-secondary-900`}
      onClick={handleShowHiden}
    >
      <aside
        className={`w-64 ${
          isCollapse ? 'lg:w-16' : 'lg:w-64'
        } h-full transition-all duration-300 transform border-r bg-white border-secondary-200 dark:bg-secondary-800 dark:border-secondary-700`}
      >
        <div className="h-full mt-16 px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 text-xl">
            {options.map((menuItem, index) => (
              <li key={index}>
                {menuItem.submenu ? (
                  <button
                    onClick={() => {
                      setActiveSubmenu(activeSubmenu === index ? null : index);
                      setIsCollapse(false);
                    }}
                    className={`relative flex items-center w-full p-2 h-10 transition duration-75 rounded-lg group text-secondary-900 hover:bg-secondary-100 dark:text-white dark:hover:bg-secondary-700 ${
                      activeSubmenu === index
                        ? 'bg-secondary-100 dark:bg-secondary-700'
                        : ''
                    }`}
                  >
                    <div className="static ">{menuItem.icon}</div>
                    <span className="text-base flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      {menuItem.label}
                    </span>
                    <IoIosArrowDown />
                  </button>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center p-2 h-9 text-secondary-900 rounded-lg dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-700 group ${
                        isActive ? 'text-blue-500 dark:text-blue-500' : ''
                      }`
                    }
                    to={menuItem.path}
                  >
                    <div className="static opacity-75">{menuItem.icon}</div>
                    <span
                      className={`inline-block text-nowrap text-base ms-3 ${
                        isCollapse ? 'lg:hidden' : ''
                      }`}
                    >
                      {menuItem.label}
                    </span>
                  </NavLink>
                )}
                {menuItem.submenu && activeSubmenu === index && (
                  <ul className="py-2 space-y-2">
                    {menuItem.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className="flex items-center w-full p-2 text-base text-secondary-900 transition duration-75 rounded-lg pl-11 group hover:bg-secondary-100 dark:text-white dark:hover:bg-secondary-700"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

Sidebar.propTypes = {
  options: PropTypes.array,
  isCollapse: PropTypes.bool,
  setIsCollapse: PropTypes.func
};

export { Sidebar };
