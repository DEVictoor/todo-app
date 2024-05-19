import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/appointment', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/appointment/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/appointment', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/appointment/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/appointment/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
