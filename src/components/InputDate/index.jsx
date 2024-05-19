import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import { FaCalendar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useClickOutside } from '../../hooks/useClickOutside';
import { monthNames } from '../../utilities/time.utilities';
import { InputContainer } from '../InputContainer';

const InputDate = ({
  className,
  label,
  name,
  today,
  register,
  required,
  ...params
}) => {
  const { errors, value, handleChange } = register(name, { required });
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const domRef = useClickOutside(() => setIsOpen(false));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: isOpen ? 'bottom-start' : 'top-start'
  });

  useEffect(() => {
    if (!today) return;
    handleChange(new Date());
    // eslint-disable-next-line
  }, [today]);

  const onChange = date => {
    handleChange(date.toISOString());
    setIsOpen(false);
  };

  const daysInMonth = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const formatDate = string => {
    if (!string) return;
    const date = new Date(string);
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(selectedDate);
    const firstDayOfWeek = (selectedDate.getDay() + 6) % 7;

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      days.push(
        <span
          key={i}
          className={`${
            i === 1 ? 'col-start-' + firstDayOfWeek : ''
          } hover:bg-secondary-100 dark:hover:bg-secondary-600 block leading-9 border-0 rounded-lg cursor-pointer text-center text-secondary-900 dark:text-white font-semibold text-sm`}
          onClick={() => onChange(date)}
        >
          {i}
        </span>
      );
    }
    return days;
  };

  const previousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

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
        {isOpen && (
          <div
            className="absolute top-full left-0 my-2 p-4 h-96 inline-block rounded-lg shadow-3xl z-50 bg-white dark:bg-secondary-700"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="flex justify-between mb-2">
              <button
                className="bg-white dark:bg-secondary-700 rounded-lg text-secondary-500 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-600 hover:text-secondary-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-secondary-200"
                type="button"
                onClick={previousMonth}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="text-sm rounded-lg text-secondary-900 dark:text-white bg-white dark:bg-secondary-700 font-semibold py-2.5 px-5 hover:bg-secondary-100 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-secondary-200"
                type="button"
              >
                {`${
                  monthNames[selectedDate.getMonth()]
                } ${selectedDate.getFullYear()}`}
              </button>
              <button
                className="bg-white dark:bg-secondary-700 rounded-lg text-secondary-500 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-600 hover:text-secondary-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-secondary-200"
                type="button"
                onClick={nextMonth}
              >
                <IoIosArrowForward />
              </button>
            </div>
            <div className="p-1">
              <div>
                <div className="grid grid-cols-7 mb-1">
                  <span className="text-center h-6 leading-6 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                    Lu
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                    Ma
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                    Mi
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                    Ju
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                    Vi
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                    Sa
                  </span>
                  <span className="text-center h-6 leading-6 text-sm font-medium text-secondary-500 dark:text-secondary-400">
                    Do
                  </span>
                </div>
                <div className="w-64 grid grid-cols-7 grid-rows-6">
                  {renderCalendar()}
                </div>
              </div>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse mt-2">
              <button
                className="text-white bg-blue-700 dark:bg-blue-600 dark:dark:bg-blue-600 hover:bg-blue-800 hover:dark:bg-blue-800 dark:hover:bg-blue-700 dark:hover:dark:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:dark:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"
                type="button"
                onClick={() => onChange(new Date())}
              >
                Hoy
              </button>
              <button
                className="text-secondary-900 dark:text-white bg-white dark:bg-secondary-700 border border-secondary-300 dark:border-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-600 focus:ring-4 focus:ring-blue-300 focus:dark:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"
                type="button"
                onClick={() => handleChange('')}
              >
                Limpiar
              </button>
            </div>
          </div>
        )}
        <button
          className="flex items-center justify-between p-2.5 w-full h-12 focus:ring-1 focus:outline-none rounded-lg text-sm text-center border bg-secondary-50 border-secondary-300 text-secondary-900 focus:ring-blue-600 focus:border-blue-600 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          {...params}
        >
          <FaCalendar /> {formatDate(value) || '\u00a0'}
        </button>
      </div>
    </InputContainer>
  );
};

InputDate.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  today: PropTypes.bool,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export { InputDate };
