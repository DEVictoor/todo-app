import PropTypes from 'prop-types';
const Button = ({ onClick, icon }) => {
  return (
    <div className="p-0 m-0">
      {' '}
      <button
        className="bg-secondary-50 w-10 h-10 flex items-center justify-center text-md rounded-md border"
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  );
};

Button.propTypes = { onClick: PropTypes.func, icon: PropTypes.any };

export default Button;
