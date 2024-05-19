import PropTypes from 'prop-types';
import { InputContainer } from '../InputContainer';
import { useEffect, useId, useRef, useState } from 'react';

const InputText = ({
  className,
  label,
  name,
  uppercase,
  register,
  prefix,
  postfix,
  required,
  minLength,
  maxLength,
  isEmail,
  disabled,
  ...params
}) => {
  const domId = useId();
  const domRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength,
    isEmail
  });

  useEffect(() => {
    params.focus && domRef.current.focus();
    params.focus && domRef.current.value && domRef.current.select();
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    let newValue = e.target.value;
    if (uppercase) {
      newValue = newValue.toUpperCase();
    }
    handleChange(newValue);
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div
        className={`flex gap-2 p-2.5 w-full h-12 rounded-lg border bg-secondary-50 border-secondary-300 text-secondary-900 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white ${
          focus
            ? 'outline-none ring-2 ring-blue-600 border-blue-600 dark:ring-blue-500 dark:border-blue-500'
            : ''
        } ${!disabled ? 'cursor-text' : ''}`}
        onClick={() => domRef.current.focus()}
      >
        {prefix && <span>{prefix}</span>}
        <input
          className="w-full text-sm bg-transparent focus:outline-none"
          ref={domRef}
          id={domId}
          type="text"
          name={name}
          value={value || ''}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disabled={disabled}
          {...params}
        />
        {postfix && <span>hola{postfix}</span>}
      </div>
    </InputContainer>
  );
};

InputText.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  uppercase: PropTypes.bool,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  isEmail: PropTypes.bool,
  disabled: PropTypes.bool
};

export { InputText };
