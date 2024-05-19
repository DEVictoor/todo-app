import PropTypes from 'prop-types';
import { InputContainer } from '../InputContainer';
import { useId } from 'react';

const InputCheck = ({
  className,
  label,
  name,
  labelCheck,
  register,
  ...params
}) => {
  const domId = useId();
  const { errors, value, handleChange } = register(name);

  const onChange = e => handleChange(e.target.checked);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="flex items-center">
        <input
          className="w-4 h-6 text-blue-600 bg-secondary-100 border-secondary-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-secondary-800 focus:ring-2 dark:bg-secondary-700 dark:border-secondary-600"
          id={domId}
          type="checkbox"
          checked={value || false}
          onChange={onChange}
          {...params}
        />
        <label
          className="ms-2 text-sm font-medium text-secondary-900 dark:text-secondary-300"
          htmlFor={name}
        >
          {labelCheck}
        </label>
      </div>
    </InputContainer>
  );
};

InputCheck.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelCheck: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired
};

export { InputCheck };
