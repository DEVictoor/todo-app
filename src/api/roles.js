import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/role', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/role/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/role', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/role/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/role/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
