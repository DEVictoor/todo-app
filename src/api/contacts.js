import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/contact', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/contact/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/contact', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/contact/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/contact/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
