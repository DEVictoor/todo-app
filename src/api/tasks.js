import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/item', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/item/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/item', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/item/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/item/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
