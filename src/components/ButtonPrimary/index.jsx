import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

const ButtonPrimary = ({
  children,
  className,
  type = 'button',
  to,
  color,
  isFull,
  ...params
}) => {
  let selectedColor =
    'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 disabled:bg-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800 dark:disabled:bg-primary-400';

  switch (color) {
    case 'Blue':
      selectedColor =
        'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:bg-blue-300';
      break;
    case 'Red':
      selectedColor =
        'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 disabled:bg-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:disabled:bg-red-300';
      break;
    case 'LightSwitch':
      selectedColor =
        'text-secondary-900 bg-white hover:bg-secondary-100 border-secondary-200 focus:ring-secondary-100 hover:text-blue-700 dark:bg-secondary-800 dark:hover:bg-secondary-700 dark:text-secondary-400 dark:border-secondary-600  dark:hover:text-white dark:focus:ring-secondary-700';
      break;
    case 'DarkSwitch':
      selectedColor =
        'text-white bg-secondary-800 hover:bg-secondary-700 border-secondary-600 focus:ring-secondary-700 dark:bg-white dark:text-secondary-900 dark:hover:bg-secondary-200 dark:border-secondary-300 dark:hover:border-secondary-600 dark:focus:ring-secondary-100';
      break;
    default:
      break;
  }

  return to ? (
    <Link
      className={clsx(
        `${
          isFull ? 'w-full text-center' : ''
        } flex gap-2 items-center justify-center h-10 px-5 py-2.5 text-nowrap font-medium text-sm rounded-lg focus:ring-4 focus:outline-none ${selectedColor}`,
        className
      )}
      to={to}
      {...params}
    >
      {children}
    </Link>
  ) : (
    <button
      className={clsx(
        `${
          isFull ? 'w-full text-center' : ''
        } flex gap-2 items-center justify-center h-10 px-5 py-2.5 text-nowrap font-medium text-sm rounded-lg focus:ring-4 focus:outline-none ${selectedColor}`,
        className
      )}
      type={type}
      {...params}
    >
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  isFull: PropTypes.bool
};

export { ButtonPrimary };
