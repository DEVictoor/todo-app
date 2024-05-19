import { axiosInstance } from '../utilities';

const getAuth = form =>
  axiosInstance
    .post('/auth/login', form)
    .then(res => res.data)
    .catch(err => err);

export { getAuth };
