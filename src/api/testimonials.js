import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/testimony', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/testimony/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/testimony', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/testimony/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/testimony/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
