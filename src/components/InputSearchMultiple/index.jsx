import { useEffect, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { IoMdClose } from 'react-icons/io';
import { InputContainer } from '../InputContainer';
import { useClickOutside } from '../../hooks/useClickOutside';

const InputSearchMultiple = ({
  className,
  label,
  name,
  options,
  register,
  required,
  ...props
}) => {
  const domId = useId();
  const domRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [focus, setFocus] = useState(false);
  const domRefOptions = useClickOutside(() => setIsOpen(false));
  const { errors, value, handleChange } = register(name, { required });

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const onChange = e => filterOptions(e.target.value);

  const handleFocus = () => {
    domRef.current.focus();
    setFocus(true);
  };

  const handleBlur = () => setFocus(false);

  const handleRemove = (e, index) => {
    e.preventDefault();
    if (value?.includes(index)) {
      const tags = value.filter(item => item !== index);
      handleChange(tags);
    }
  };

  const handleSelect = index => {
    if (value) {
      if (!value.includes(index)) handleChange([...value, index]);
    } else {
      handleChange([index]);
    }

    domRef.current.value = '';
    domRef.current.focus();
    setFocus(true);
  };

  const filterOptions = string => {
    const filtered = options.filter(item =>
      item.label?.toLowerCase().includes(string?.toLowerCase())
    );

    if (filtered.length === 1 && filtered[0]?.value === string) {
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
          domRefOptions.current = node;
        }}
      >
        <div
          className={`flex items-center p-2.5 w-full min-h-12 sm:text-sm bg-secondary-50 border border-secondary-300 text-secondary-900 rounded-lg cursor-text dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white ${
            focus
              ? 'outline-none ring-1 ring-blue-600 border-blue-600 dark:ring-blue-500 dark:border-blue-500'
              : ''
          }`}
          onClick={handleFocus}
        >
          <ul className="flex flex-wrap gap-2 min-h-5">
            {value?.map(elem => (
              <li
                key={elem}
                className="flex items-center pl-2 pr-1.5 h-6 rounded border bg-secondary-200 border-secondary-300 dark:bg-secondary-500 dark:border-secondary-400"
              >
                {options.filter(item => item.value === elem)[0]?.label}
                <button
                  className="ml-1 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
                  type="button"
                  onClick={e => handleRemove(e, elem)}
                >
                  <IoMdClose />
                </button>
              </li>
            ))}
            <input
              className="outline-none bg-transparent"
              id={domId}
              ref={domRef}
              type="text"
              name={name}
              spellCheck="false"
              autoComplete="off"
              onChange={onChange}
              onFocus={() => setIsOpen(true)}
              onBlur={handleBlur}
              {...props}
            />
          </ul>
        </div>
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

InputSearchMultiple.propTypes = {
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
  required: PropTypes.bool
};

export { InputSearchMultiple };
