import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '../api/auth';
import {
  decodePayload,
  deleteSession,
  getSession,
  setSession
} from './session.utilities';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const session = getSession();
  const [user, setUser] = useState(decodePayload(session.refreshToken));

  const login = async form => {
    const tokens = await getAuth(form);

    if (tokens && tokens.refreshToken && tokens.accessToken) {
      setSession(tokens.accessToken, tokens.refreshToken);
      setUser(decodePayload(tokens.refreshToken));
      navigate('/');
    }
  };

  const logout = () => {
    deleteSession();
    setUser(null);
    navigate('/login');
  };

  const auth = { user, login, logout };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = { children: PropTypes.node };

// eslint-disable-next-line
export { AuthContext, AuthProvider };
