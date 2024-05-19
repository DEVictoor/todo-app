import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/faq', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/faq/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/faq', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/faq/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/faq/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
