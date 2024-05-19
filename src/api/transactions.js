import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/transaction', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/transaction/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/transaction', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/transaction/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/transaction/' + id)
    .then(res => res.data)
    .catch(err => err);

const getKardex = filter =>
  axiosPrivate
    .get('/transaction/kardex', { params: filter })
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove, getKardex };
