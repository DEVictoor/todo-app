import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { FaFile, FaRegTrashAlt } from 'react-icons/fa';
import { useAlert } from '../../hooks/useAlert.hook';
import {
  formatDateCasual,
  formatTimeCasual
} from '../../utilities/time.utilities';
import { Alert } from '../Alert';

const Table = ({
  className,
  structure,
  data,
  page = 1,
  handleUpdate,
  handleDelete
}) => {
  const AlertDelete = useAlert();
  const [currentId, setCurrentId] = useState(null);

  const handleDeleteEvent = id => {
    AlertDelete.openAlert();
    setCurrentId(id);
  };

  const handleConfirm = async () => {
    try {
      await handleDelete(currentId);
    } finally {
      AlertDelete.closeAlert();
    }
  };

  const handleCancel = () => setCurrentId(null);

  const shortFileName = originalName => {
    if (!originalName) return;
    const extension = originalName.split('.').pop();
    let name = originalName.replace(/\.[^.]+$/, '');

    if (name.length > 20) {
      name = name.substring(0, 20) + '..';
    }

    return `${name}.${extension}`;
  };

  return (
    <div
      className={clsx(
        'relative overflow-auto border-t border-b dark:border-secondary-500',
        className
      )}
    >
      <table className="w-full text-sm text-left rtl:text-right border-separate border-spacing-0 text-secondary-500 dark:text-secondary-400">
        <thead className="text-xs uppercase text-secondary-500 dark:text-secondary-400">
          <tr className="sticky top-0 left-0 z-10 bg-secondary-100 dark:bg-secondary-700">
            <th className="px-4 py-4 w-1 font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10 border-r border-secondary-200 dark:border-secondary-600">
              #
            </th>
            {structure.map(column => (
              <th
                key={column.attr}
                className={
                  column.attr === 'photo'
                    ? 'px-4 py-4 w-12 font-medium text-nowrap bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10 border-r border-secondary-200 dark:border-secondary-600'
                    : 'px-4 py-4 font-medium text-nowrap bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10 border-r border-secondary-200 dark:border-secondary-600'
                }
              >
                {column.label}
              </th>
            ))}
            <th className="px-4 py-4 w-1 font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td className="py-4 text-center" colSpan={structure.length + 2}>
                No hay registros disponibles
              </td>
            </tr>
          )}
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="dark:hover:bg-opacity-40 border-b bg-white dark:bg-secondary-800 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700"
            >
              <td className="items-center px-4 py-2 font-semibold whitespace-nowrap text-secondary-900 dark:text-white">
                {(page - 1) * 50 + (index + 1)}
              </td>
              {structure.map(column => {
                switch (column.type) {
                  case 'idCard':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="items-center px-4 py-2 text-secondary-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex">
                          <div className="relative w-10 h-10 bg-secondary-100 dark:bg-secondary-600 rounded-full overflow-hidden">
                            {!row[column.attr].photo ? (
                              <svg
                                className="absolute w-auto h-auto text-secondary-400 -bottom-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            ) : (
                              <img src={row[column.attr].photo} />
                            )}
                          </div>
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {row[column.attr]?.fullName}
                            </div>
                            <div className="font-normal text-secondary-400">
                              {row[column.attr]?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  case 'photo':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="items-center px-4 py-2 text-secondary-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex">
                          <div className="relative w-10 h-10 bg-secondary-100 dark:bg-secondary-600 rounded-full overflow-hidden">
                            {!row.photo ? (
                              <svg
                                className="absolute w-auto h-auto text-secondary-400 -bottom-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            ) : (
                              <img src={row.photo} />
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  case 'tag':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2"
                      >
                        <span
                          className={`text-sm font-normal px-2.5 py-0.5 whitespace-nowrap rounded border ${
                            row[column.attr].color === 'GREEN'
                              ? 'bg-green-200 dark:bg-transparent border-green-200 dark:border-green-400 text-green-800 dark:text-green-400'
                              : row[column.attr].color === 'RED'
                              ? 'bg-red-200 dark:bg-transparent border-red-200 dark:border-red-400 text-red-800 dark:text-red-400'
                              : 'bg-secondary-200 dark:bg-transparent border-secondary-200 dark:border-secondary-400 text-secondary-800 dark:text-secondary-400'
                          }`}
                        >
                          {row[column.attr].label}
                        </span>
                      </td>
                    );
                  case 'tags':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2"
                      >
                        <div className="flex gap-2 flex-wrap">
                          {row[column.attr]?.map((tag, i) => (
                            <span
                              key={row.id + '_' + column.attr + '_' + i}
                              className="bg-secondary-100 text-secondary-800 text-sm font-normal px-2.5 py-0.5 rounded dark:bg-secondary-700 dark:text-secondary-300 whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    );
                  case 'link':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2"
                      >
                        <Link
                          className="text-primary-400 dark:text-primary-400 hover:underline"
                          to={row[column.attr]?.url}
                        >
                          {row[column.attr]?.label}
                        </Link>
                      </td>
                    );
                  case 'text':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2 text-nowrap  "
                        // max-w-[500px] overflow-hidden
                      >
                        {row[column.attr]}
                      </td>
                    );
                  case 'bold':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2 text-secondary-500 dark:text-secondary-300 text-nowrap font-medium"
                      >
                        {row[column.attr]}
                      </td>
                    );
                  case 'files':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2 text-secondary-500 dark:text-secondary-300 text-nowrap"
                      >
                        {row[column.attr]?.map((item, index) => (
                          <Link
                            key={index}
                            className="flex items-center gap-1 py-1 hover:text-primary-500"
                            to={item.url}
                            target="_blank"
                          >
                            <FaFile />
                            {shortFileName(item.label)}
                          </Link>
                        ))}
                      </td>
                    );
                  case 'users':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2 text-secondary-500 dark:text-secondary-300 text-nowrap"
                      >
                        <div className="flex flex-col">
                          {row[column.attr]?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 py-1"
                            >
                              <div className="relative w-5 h-5 bg-secondary-100 dark:bg-secondary-600 rounded-full overflow-hidden">
                                {!row[column.attr].photo ? (
                                  <svg
                                    className="absolute w-auto h-auto text-secondary-400 -bottom-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                ) : (
                                  <img
                                    className="w-5 h-5 rounded-full"
                                    src={item.image}
                                  />
                                )}
                              </div>
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  case 'status':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2"
                      >
                        <div className="flex items-center">
                          <div
                            className={`h-2.5 w-2.5 rounded-full me-2 ${
                              row[column.attr] ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          ></div>
                          {row[column.attr] ? 'Activo' : 'Inactivo'}
                        </div>
                      </td>
                    );
                  case 'by':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2"
                      >
                        <div className="flex items-center">
                          <img className="w-4 h-4" src={row[column.attr].url} />
                          {row[column.attr].label}
                        </div>
                      </td>
                    );
                  case 'date':
                    return (
                      <td
                        key={row.id + '_' + column.attr}
                        className="px-4 py-2"
                      >
                        <div className="flex flex-col items-end">
                          <span className="text-nowrap">
                            {formatDateCasual(row[column.attr])}
                          </span>
                          <span className="text-nowrap">
                            {formatTimeCasual(row[column.attr])}
                          </span>
                        </div>
                      </td>
                    );
                }
              })}
              {(handleUpdate || handleDelete) && (
                <td className="px-4 py-2">
                  <div className="flex gap-2 items-center justify-center">
                    {handleUpdate && (
                      <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-opacity-10 hover:bg-opacity-20 text-blue-500 bg-blue-500"
                        onClick={() => handleUpdate(row.id || index)}
                      >
                        <BiSolidEdit size={20} />
                      </button>
                    )}
                    {handleDelete && (
                      <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-opacity-10 hover:bg-opacity-20 text-red-500 bg-red-500"
                        onClick={() => handleDeleteEvent(row.id || index)}
                      >
                        <FaRegTrashAlt size={16} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Alert
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        {...AlertDelete.register}
      />
    </div>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  structure: PropTypes.array,
  data: PropTypes.array,
  page: PropTypes.number,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func
};

export { Table };
