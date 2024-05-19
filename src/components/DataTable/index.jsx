import PropTypes from 'prop-types';
import { FaFilePdf, FaPlus } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { ButtonPrimary } from '../ButtonPrimary';

const DataTable = ({
  structure,
  data,
  pagination,
  filter,
  setPage,
  setSearch,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleExport
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-4 m-4 h-10">
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-80">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none text-xl text-secondary-400">
              <IoIosSearch />
            </div>
            <input
              className="block p-2 pl-10 w-full text-sm outline-none border focus:border-2 rounded-lg text-secondary-900 border-secondary-300 bg-secondary-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-secondary-700 dark:border-secondary-600 dark:placeholder-secondary-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Buscar..."
              value={filter.search}
              onChange={setSearch}
            />
          </div>
          <div className="flex gap-2">
            {handleCreate && (
              <ButtonPrimary onClick={handleCreate}>
                <FaPlus size={18} />
                <span className="hidden md:inline-block">Agregar</span>
              </ButtonPrimary>
            )}
            {handleExport && (
              <ButtonPrimary color="DarkSwitch" onClick={handleExport}>
                <FaFilePdf size={18} />
                <span className="hidden md:inline-block">Exportar</span>
              </ButtonPrimary>
            )}
          </div>
        </div>
      </div>
      <Table
        className="h-[calc(100vh_-_20.5rem)]"
        structure={structure}
        data={data}
        page={filter.page.number}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleExport={handleExport}
      />
      <div className="flex items-center justify-between m-4 h-10 dark:text-white">
        <p>{`${pagination.from} al ${pagination.to} de ${pagination.total}`}</p>
        <Pagination
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          currentPage={filter.page.number}
          setCurrentPage={setPage}
        />
      </div>
    </Card>
  );
};

DataTable.propTypes = {
  structure: PropTypes.array,
  data: PropTypes.array,
  pagination: PropTypes.object,
  filter: PropTypes.object,
  setPage: PropTypes.func,
  setSearch: PropTypes.func,
  handleCreate: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleExport: PropTypes.func
};

export { DataTable };
