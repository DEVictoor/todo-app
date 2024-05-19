import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/business', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/business/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/business', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/business/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/business/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
