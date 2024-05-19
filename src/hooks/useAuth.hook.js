import { useContext } from 'react';
import { AuthContext } from '../utilities/auth.utilities';

const useAuth = () => useContext(AuthContext);

export { useAuth };
