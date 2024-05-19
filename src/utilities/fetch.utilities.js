import axios from 'axios';
import { toast } from 'sonner';
import { getSession, setSession } from './session.utilities';

const BASE_URL = import.meta.env.VITE_URL_API;
const axiosInstance = axios.create({ baseURL: BASE_URL });
const axiosRefresh = axios.create({ baseURL: BASE_URL });
const axiosPrivate = axios.create({ baseURL: BASE_URL });
let auth;

const setUserInstance = func => {
  auth = func;
};

const ERROR_MESSAGES = {
  400: '¡Oops! Hubo un problema con tu solicitud. Por favor, inténtalo de nuevo.',
  401: 'Por favor, inicia sesión y vuelve a intentarlo.',
  403: 'Lo siento, no tienes permiso para esto. Intenta iniciar sesión.',
  404: '¡Ups! Recurso no encontrado.',
  500: '¡Vaya! Algo salió mal en nuestro servidor. Intenta nuevamente.',
  503: 'Lo sentimos, estamos ocupados. Por favor, intenta más tarde.',
  DEFAULT: '¡Ups! Algo salió mal. Inténtalo de nuevo más tarde.'
};

const handleRequestError = err => {
  if (err.response) {
    const { status } = err.response;
    const errorMessage = ERROR_MESSAGES[status] || ERROR_MESSAGES.DEFAULT;
    if (status === 401 || status === 403) auth.logout();
    toast.error(errorMessage);
  } else if (err.request) {
    toast.error(ERROR_MESSAGES.DEFAULT);
  } else {
    toast.error(ERROR_MESSAGES.DEFAULT);
  }
};

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    handleRequestError(err);
    return Promise.reject(err);
  }
);

axiosRefresh.interceptors.request.use(req => {
  const refreshToken = getSession().refreshToken;
  if (refreshToken) req.headers.Authorization = `Bearer ${refreshToken}`;
  return req;
});

axiosRefresh.interceptors.response.use(
  res => {
    if (res.data && res.data.accessToken) setSession(res.data.accessToken);
    return res;
  },
  err => {
    handleRequestError(err);
    return Promise.reject(err);
  }
);

axiosPrivate.interceptors.request.use(req => {
  const accessToken = getSession().accessToken;
  if (accessToken) req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

axiosPrivate.interceptors.response.use(
  res => res,
  async err => {
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      const response = await axiosRefresh.post('/auth/refresh');
      if (response.data && response.data.accessToken)
        return axiosPrivate(err.config);
    }

    handleRequestError(err);
    return Promise.reject(err);
  }
);

export { setUserInstance, axiosInstance, axiosPrivate };
