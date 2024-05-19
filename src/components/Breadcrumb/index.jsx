import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

const Breadcrumb = ({ options }) => {
  return (
    <nav className="flex h-4">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            className="inline-flex gap-2 items-center text-sm font-medium text-secondary-700 hover:text-blue-600 dark:text-secondary-400 dark:hover:text-white"
            to="/"
          >
            <FaHome size={18} />
            Inicio
          </Link>
        </li>
        {options?.map(item => (
          <li key={item.url}>
            <div className="flex items-center text-secondary-500 dark:text-secondary-400">
              <IoIosArrowForward size={18} />
              <Link
                className="ms-1 text-sm font-medium text-secondary-700 hover:text-blue-600 md:ms-2 dark:text-secondary-400 dark:hover:text-white"
                to={item.url}
              >
                {item.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

export { Breadcrumb };
