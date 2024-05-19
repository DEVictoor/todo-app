import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/team', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/team/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/team', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/team/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/team/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
