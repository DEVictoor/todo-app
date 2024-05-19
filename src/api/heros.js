import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/hero', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/hero/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/hero', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/hero/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/hero/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
