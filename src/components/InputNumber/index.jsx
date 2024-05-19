import { useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { InputContainer } from '../InputContainer';

const InputNumber = ({
  className,
  label,
  name,
  prefix,
  postfix,
  register,
  required,
  minValue,
  maxValue,
  disabled,
  ...params
}) => {
  const domId = useId();
  const domRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const { errors, value, handleChange } = register(name, {
    required,
    minValue,
    maxValue
  });

  const onChange = e => {
    let newValue = e.target.value
      .replace(/[^\d.-]/g, '')
      .replace(/^(\d*\.\d*).*$/, '$1');

    if (newValue.includes('-') && !newValue.startsWith('-'))
      newValue = newValue.replace(/-/g, '');

    if (newValue.includes('.'))
      newValue = newValue.replace(/^([^.]*\.)|\./g, '$1');

    if (minValue && Math.sign(minValue) !== -1)
      newValue = newValue.replace(/-/g, '');

    if (maxValue && parseFloat(newValue) > maxValue) return;

    if (parseFloat(newValue) && !newValue.endsWith('.'))
      handleChange(parseFloat(newValue));
    else handleChange(newValue);
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
          className="w-full text-right text-sm bg-transparent focus:outline-none"
          ref={domRef}
          id={domId}
          type="text"
          name={name}
          value={value !== undefined && value !== null ? value + '' : ''}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disabled={disabled}
          {...params}
        />
        {postfix && <span>{postfix}</span>}
      </div>
    </InputContainer>
  );
};

InputNumber.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  isEmail: PropTypes.bool,
  disabled: PropTypes.bool
};

export { InputNumber };
