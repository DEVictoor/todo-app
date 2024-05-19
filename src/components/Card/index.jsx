import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Card = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'block bg-white border border-secondary-200 rounded-lg shadow dark:bg-secondary-800 dark:border-secondary-700',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export { Card };
