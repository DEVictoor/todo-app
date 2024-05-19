import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import { InputContainer } from '../InputContainer';

const InputPassword = ({
  className,
  label,
  name,
  register,
  required,
  minLength,
  maxLength,
  ...params
}) => {
  const domId = useId();
  const [isHidden, setIsHidden] = useState(true);
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength
  });

  const onChange = e => handleChange(e.target.value);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div className="relative">
        <input
          id={domId}
          className="block p-2.5 w-full h-12 sm:text-sm bg-secondary-50 border border-secondary-300 text-secondary-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type={isHidden ? 'password' : 'text'}
          name={name}
          value={value || ''}
          onChange={onChange}
          {...params}
        />
        <button
          className="absolute top-0 end-0 p-3.5 rounded-e-lg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-secondary-600"
          type="button"
          onClick={() => setIsHidden(prev => !prev)}
        >
          <svg
            className="flex-shrink-0 size-3.5 text-secondary-400 dark:text-secondary-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className={isHidden ? '' : 'hidden'}
              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
            />
            <path
              className={isHidden ? '' : 'hidden'}
              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
            />
            <path
              className={isHidden ? '' : 'hidden'}
              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
            />
            <line
              className={isHidden ? '' : 'hidden'}
              x1="2"
              x2="22"
              y1="2"
              y2="22"
            />
            <path
              className={isHidden ? 'hidden' : ''}
              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
            />
            <circle
              className={isHidden ? 'hidden' : ''}
              cx="12"
              cy="12"
              r="3"
            />
          </svg>
        </button>
      </div>
    </InputContainer>
  );
};

InputPassword.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number
};

export { InputPassword };
