import { useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { InputContainer } from '../InputContainer';

const InputTags = ({
  className,
  label,
  name,
  register,
  required,
  ...props
}) => {
  const domId = useId();
  const domRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const { errors, value, handleChange } = register(name, { required });
  const separators = [',', ';', '|'];

  const handleFocus = () => {
    domRef.current.focus();
    setFocus(true);
  };

  const handleInput = e => {
    if (separators.includes(e.nativeEvent.key)) {
      const regex = new RegExp(`[${separators.join('')}]+`, 'g');
      const tag = e.target.value?.replace(regex, '').trim();

      if (tag.length > 0) {
        if (value) {
          if (!value.includes(tag)) handleChange([...value, tag]);
        } else {
          handleChange([tag]);
        }
      }

      e.target.value = '';
      e.preventDefault();
    }
  };

  const handlePaste = e => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');

    const tags = pastedData
      .split(new RegExp(`[${separators.join('')}]+`))
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    if (tags.length > 0) {
      const updatedTags = value ? [...value, ...tags] : [...tags];
      handleChange(updatedTags);
    }

    e.preventDefault();
  };

  const handleBlur = e => {
    const tag = e.target.value?.trim();

    if (tag.length > 0) {
      const tags = value ? [...value, tag] : [tag];
      handleChange(tags);
    }

    e.target.value = '';
    setFocus(false);
  };

  const handleRemove = (e, elem) => {
    e.preventDefault();
    if (value?.includes(elem)) {
      const tags = value.filter(item => item !== elem);
      handleChange(tags);
    }
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={errors[name]?.message}
    >
      <div
        className={`flex items-center p-2.5 w-full min-h-12 sm:text-sm bg-secondary-50 border border-secondary-300 text-secondary-900 rounded-lg cursor-text dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white ${
          focus
            ? 'outline-none ring-2 ring-blue-600 border-blue-600 dark:ring-blue-500 dark:border-blue-500'
            : ''
        }`}
        onClick={handleFocus}
      >
        <ul className="flex flex-wrap gap-2 min-h-5">
          {value?.map(elem => (
            <li
              key={elem}
              className="flex items-center pl-2 pr-1.5 py-0.5 h-6 rounded border bg-secondary-200 border-secondary-300 dark:bg-secondary-500 dark:border-secondary-400"
            >
              {elem}
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
            onKeyDown={handleInput}
            onPaste={handlePaste}
            onBlur={handleBlur}
            {...props}
          />
        </ul>
      </div>
    </InputContainer>
  );
};

InputTags.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export { InputTags };
