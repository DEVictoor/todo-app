import { axiosPrivate } from '../utilities';

const getAll = filter =>
  axiosPrivate
    .get('/storage/file', { params: filter })
    .then(res => res.data)
    .catch(err => err);

const get = id =>
  axiosPrivate
    .get('/storage/file/' + id)
    .then(res => res.data)
    .catch(err => err);

const post = (form, setProgress) =>
  axiosPrivate
    .post('/storage/file', form, {
      onUploadProgress: ({ progress, loaded, total }) => {
        if (setProgress) {
          setProgress(prev => ({ ...prev, progress, loaded, total }));
        }
      }
    })
    .then(res => res.data)
    .catch(err => err);

const put = (id, form) =>
  axiosPrivate
    .put('/storage/file/' + id, form)
    .then(res => res.data)
    .catch(err => err);

const remove = id =>
  axiosPrivate
    .delete('/storage/file/' + id)
    .then(res => res.data)
    .catch(err => err);

export { getAll, get, post, put, remove };
