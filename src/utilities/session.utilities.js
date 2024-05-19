import { cookieCreate, cookieSearch, cookieRemove } from './cookies.utilities';

const getSession = () => {
  return {
    refreshToken: cookieSearch('refreshToken'),
    accessToken: cookieSearch('accessToken')
  };
};

const setSession = (accessToken, refreshToken) => {
  cookieCreate('accessToken', accessToken);
  if (refreshToken) cookieCreate('refreshToken', refreshToken);
};

const deleteSession = () => {
  cookieRemove('refreshToken');
  cookieRemove('accessToken');
};

const decodePayload = token => {
  if (!token) return null;
  const payload = token.split('.')[1];
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const decode = atob(base64);
  return JSON.parse(decode);
};

export { getSession, setSession, deleteSession, decodePayload };
