import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { IoIosArrowDown } from 'react-icons/io';
import { useClickOutside } from '../../hooks/useClickOutside';
import { InputContainer } from '../InputContainer';

const InputSelect = ({
  className,
  label,
  name,
  options = [],
  firstValue,
  toNumber,
  toBoolean,
  register,
  required,
  callback,
  ...params
}) => {
  const output = toNumber ? 'number' : toBoolean ? 'boolean' : null;
  const {
    errors,
    value: initialValue,
    handleChange
  } = register(name, { required }, output);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const domRef = useClickOutside(() => setIsOpen(false));

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

  const onChange = e => {
    callback && callback(e.target.value);
    handleChange(e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!firstValue || options.length < 1) return;
    if (value === options[0].value) return;
    setValue(options[0].value);
    handleChange(options[0].value);
    // eslint-disable-next-line
  }, [options]);

  return (
    <InputContainer
      className={className}
      label={label}
      name={name}
      error={errors[name]?.message}
    >
      <div
        className="relative"
        ref={node => {
          setReferenceElement(node);
          domRef.current = node;
        }}
      >
        {options.length > 0 && isOpen && (
          <div
            className="absolute top-full my-2 w-full z-20 rounded-lg shadow-3xl bg-white dark:bg-secondary-700"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <ul className="py-2 text-sm max-h-52 overflow-y-auto text-secondary-700 dark:text-secondary-200">
              {options?.map(item => (
                <li key={item.value}>
                  <input
                    className="hidden"
                    id={item.value}
                    name={name}
                    type="radio"
                    value={item.value}
                    onChange={onChange}
                    onClick={() => setIsOpen(!isOpen)}
                    checked={item.value === value}
                  />
                  <label
                    className="block px-4 py-2 cursor-pointer hover:bg-secondary-100 dark:hover:bg-secondary-600 dark:hover:text-white"
                    htmlFor={item.value}
                  >
                    {item.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="flex items-center justify-between p-2.5 w-full h-12 focus:ring-1 focus:outline-none rounded-lg text-sm text-center border bg-secondary-50 border-secondary-300 text-secondary-900 focus:ring-blue-600 focus:border-blue-600 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          {...params}
        >
          {options?.filter(item => item.value === value)[0]?.label || '\u00a0'}
          <IoIosArrowDown size={16} />
        </button>
      </div>
    </InputContainer>
  );
};

InputSelect.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
      ]).isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  firstValue: PropTypes.bool,
  toNumber: PropTypes.bool,
  toBoolean: PropTypes.bool,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  callback: PropTypes.func
};

export { InputSelect };
