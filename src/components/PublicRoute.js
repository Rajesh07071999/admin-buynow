import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/Auth';


const PublicRoute = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
