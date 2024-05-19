import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/daily', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/daily/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = form =>
  axiosPrivate
    .post('/daily', form)
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/daily/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/daily/' + id)
    .then(res => res.data)
    .catch(err => err);

const getAllSector = filter =>
  axiosPrivate
    .get('/sector', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const getAllReason = filter =>
  axiosPrivate
    .get('/reason', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const getAllShipment = filter =>
  axiosPrivate
    .get('/shipment', { params: filter })
    .then(res => res.data)
    .catch(err => err);

export {
  getAll,
  get,
  post,
  put,
  remove,
  getAllSector,
  getAllReason,
  getAllShipment
};
