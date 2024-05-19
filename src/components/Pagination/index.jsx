import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({ totalPages, currentPage, setCurrentPage = () => {} }) => {
  let pagination = [];

  if (totalPages <= 7) {
    for (let i = 2; i < totalPages; i++) {
      pagination.push(i);
    }
  } else {
    if (currentPage <= 5) {
      if (currentPage <= 4) {
        pagination.push(2);
        pagination.push(3);
      }
      pagination.push(4);
      pagination.push(5);
    }

    if (currentPage >= 5 && currentPage <= totalPages - 2) {
      pagination.push(currentPage - 1);
      pagination.push(currentPage);
      pagination.push(currentPage + 1);
    }

    if (currentPage >= totalPages - 3) {
      pagination.push(totalPages - 1);
      pagination.push(totalPages - 2);
      pagination.push(totalPages - 3);
      pagination.push(totalPages - 4);
    }
  }

  pagination = pagination
    .filter((item, index) => pagination.indexOf(item) === index)
    .sort((a, b) => a - b);

  return (
    <nav>
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            className="flex items-center justify-center px-4 w-11 h-10 ms-0 leading-tight rounded-s-lg border text-secondary-500 bg-white border-secondary-300 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white disabled:bg-secondary-100 disabled:text-secondary-400 disabled:border-secondary-300 dark:disabled:border-secondary-700 dark:disabled:text-secondary-700 dark:disabled:bg-secondary-800 dark:disabled:hover:text-secondary-700 dark:disabled:hover:bg-secondary-800"
            disabled={currentPage - 1 < 1}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          >
            <IoIosArrowBack />
          </button>
        </li>
        <li>
          <button
            className={`flex items-center justify-center px-4 w-11 h-10 leading-tight ${
              currentPage === 1
                ? 'relative z-10 text-blue-600 border border-blue-300 bg-blue-50 dark:border-secondary-700 dark:bg-secondary-700 dark:text-white'
                : 'text-secondary-500 bg-white border border-secondary-300 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white'
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        </li>
        {totalPages > 7 && pagination[0] !== 2 && (
          <li>
            <button
              className="flex items-center justify-center px-4 w-11 h-10 leading-tight text-secondary-500 bg-white border border-secondary-300 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400"
              disabled
            >
              ...
            </button>
          </li>
        )}
        {pagination.map(page => (
          <li key={page}>
            <button
              className={`flex items-center justify-center px-4 w-11 h-10 leading-tight ${
                currentPage === page
                  ? 'relative z-50 text-blue-600 border border-blue-300 bg-blue-50 dark:border-secondary-700 dark:bg-secondary-700 dark:text-white'
                  : 'text-secondary-500 bg-white border border-secondary-300 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {totalPages > 7 &&
          pagination[pagination.length - 1] !== totalPages - 1 && (
            <li>
              <button
                className="flex items-center justify-center px-4 w-11 h-10 leading-tight text-secondary-500 bg-white border border-secondary-300 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400"
                disabled
              >
                ...
              </button>
            </li>
          )}
        <li>
          {totalPages > 1 && (
            <button
              className={`flex items-center justify-center px-4 w-11 h-10 leading-tight ${
                currentPage === totalPages
                  ? 'relative z-50 text-blue-600 border border-blue-300 bg-blue-50 dark:border-secondary-700 dark:bg-secondary-700 dark:text-white'
                  : 'text-secondary-500 bg-white border border-secondary-300 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white'
              }`}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          )}
        </li>
        <li>
          <button
            className="flex items-center justify-center px-4 w-11 h-10 leading-tight rounded-e-lg border text-secondary-500 bg-white border-secondary-300 hover:bg-secondary-100 hover:text-secondary-700 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white disabled:bg-secondary-100 disabled:text-secondary-400 disabled:border-secondary-300 dark:disabled:border-secondary-700 dark:disabled:text-secondary-700 dark:disabled:bg-secondary-800 dark:disabled:hover:text-secondary-700 dark:disabled:hover:bg-secondary-800"
            disabled={currentPage + 1 > totalPages}
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            <IoIosArrowForward />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func
};

export { Pagination };
