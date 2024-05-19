import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/article', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/article/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/article', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/article/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/article/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
