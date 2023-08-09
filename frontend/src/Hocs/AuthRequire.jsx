import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AuthRequire = ({ children }) => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="login" />;
  }

  return children;
};

export default AuthRequire;
