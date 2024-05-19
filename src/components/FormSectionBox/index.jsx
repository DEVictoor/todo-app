import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const FormSectionBox = ({ children, className, title }) => {
  return (
    <div
      className={clsx(
        'w-full border rounded-lg border-secondary-200 dark:border-secondary-600',
        className
      )}
    >
      {title && (
        <h1 className="p-4 text-xs font-bold tracking-widest uppercase rounded-t-lg dark:bg-opacity-50 bg-secondary-100 dark:bg-secondary-700 text-secondary-500 dark:text-secondary-400">
          {title}
        </h1>
      )}
      <div className="grid grid-cols-12 gap-4 p-4">{children}</div>
    </div>
  );
};

FormSectionBox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
};

export { FormSectionBox };
