import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const FormSection = ({ children, className, title }) => {
  return (
    <div className={clsx('w-full', className)}>
      {title && (
        <h1 className="py-2 text-xs font-bold tracking-widest uppercase text-blue-500 dark:text-blue-400">
          {title}
        </h1>
      )}
      <div className="grid grid-cols-12 gap-4 py-4 border-t border-secondary-200 dark:border-secondary-700">
        {children}
      </div>
    </div>
  );
};

FormSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
};

export { FormSection };
