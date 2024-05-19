import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/user', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/user/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/user', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/user/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/user/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
