import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/category', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/category/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/category', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/category/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/category/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
