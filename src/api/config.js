import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/config', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const put = form =>
  axiosPrivate
    .put('/config/', form)
    .then(res => res.data)
    .catch(err => console.error(err));

export { getAll, put };
