import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/product', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/product/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/product', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/product/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/product/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
