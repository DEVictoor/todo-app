import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/service', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/service/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/service', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/service/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/service/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
