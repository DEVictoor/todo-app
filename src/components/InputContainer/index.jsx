import PropTypes from 'prop-types';
import clsx from 'clsx';

const InputContainer = ({ children, className, label, name, error = '' }) => {
  return (
    <div className={clsx(className)}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 w-min text-sm font-medium text-nowrap text-secondary-900 dark:text-white"
        >
          {label}
        </label>
      )}
      {children}
      <span className="flex justify-end mt-1 h-2 text-xs text-red-600 dark:text-red-400">
        {error}
      </span>
    </div>
  );
};

InputContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
};

export { InputContainer };
