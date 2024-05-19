import { useState } from 'react';

const useFilter = () => {
  const initialFilter = {
    page: {
      number: 1,
      size: 3
    },
    search: '',
    sort: '-createdAt'
  };

  const [filter, setFilter] = useState(initialFilter);

  const setPage = page => {
    setFilter({ ...filter, page: { ...filter.page, number: page } });
  };

  const setSearch = e => {
    setFilter({ ...filter, search: e.target.value });
  };

  const setSort = sort => {
    setFilter({ ...filter, sort });
  };

  const setReset = () => {
    setFilter(initialFilter);
  };

  return { filter, setSort, setPage, setSearch, setReset, setFilter };
};

export { useFilter };
