import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/storage/image', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/storage/image/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = (form, setProgress, width = 200, height = 200) =>
  axiosPrivate
    .post(`/storage/image?w=${width}&h=${height}`, form, {
      onUploadProgress: function (progressEvent) {
        setProgress(progressEvent);
      }
    })
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/storage/image/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/storage/image/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
