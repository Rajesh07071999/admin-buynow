import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/Auth';

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
