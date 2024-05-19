import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/information', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/information/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/information', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/information/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/information/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
