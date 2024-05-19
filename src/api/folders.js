import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/storage/folder', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/storage/folder/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/storage/folder', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/storage/folder/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/storage/folder/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
