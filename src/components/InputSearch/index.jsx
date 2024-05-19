import { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { useClickOutside } from '../../hooks/useClickOutside';
import { InputContainer } from '../InputContainer';

const InputSearch = ({
  className,
  label,
  name,
  options = [],
  register,
  required,
  minLength,
  maxLength,
  isEmail,
  ...props
}) => {
  const { errors, value, handleChange } = register(name, {
    required,
    minLength,
    maxLength,
    isEmail
  });
  const domId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const domRef = useClickOutside(() => setIsOpen(false));

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

  useEffect(() => {
    filterOptions();
    // eslint-disable-next-line
  }, [value]);

  const onChange = e => handleChange(e.target.value);

  const handleSelect = value =>
    handleChange(options.find(item => item.value === value)?.value);

  const filterOptions = () => {
    const filtered = options.filter(item =>
      item.label?.toLowerCase().includes(value?.toLowerCase())
    );

    if (filtered.length === 1 && filtered[0]?.value === value) {
      setFilteredOptions([]);
      return;
    }

    setFilteredOptions(filtered);
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div
        className="relative"
        ref={node => {
          setReferenceElement(node);
          domRef.current = node;
        }}
      >
        <input
          className="block p-2.5 w-full h-12 sm:text-sm rounded-lg focus:outline-none focus:ring-1 border bg-secondary-50 border-secondary-300 text-secondary-900 focus:ring-blue-600 focus:border-blue-600 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={domId}
          type="text"
          name={name}
          value={
            options.find(item => item.value === value)?.label || value || ''
          }
          onChange={onChange}
          onFocus={() => setIsOpen(true)}
          spellCheck={false}
          autoComplete="off"
          {...props}
        />
        {filteredOptions.length > 0 && isOpen && (
          <div
            className="absolute top-full my-2 w-full z-20 rounded-lg shadow-3xl bg-white dark:bg-secondary-700"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <ul className="my-2 text-sm max-h-52 overflow-y-scroll text-secondary-700 dark:text-secondary-200">
              {filteredOptions.map(item => (
                <li key={item.value}>
                  <input
                    className="hidden"
                    id={item.value}
                    name={name}
                    type="radio"
                    value={item.value}
                    onChange={() => handleSelect(item.value)}
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
      </div>
    </InputContainer>
  );
};

InputSearch.propTypes = {
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
  register: PropTypes.func.isRequired,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  isEmail: PropTypes.bool
};

export { InputSearch };
