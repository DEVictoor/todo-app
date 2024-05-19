import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/newsletter', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/newsletter/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/newsletter', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/newsletter/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/newsletter/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
