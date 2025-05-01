import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { LoadingScreen } from './LoadingScreen';
import { Unauthorized } from './Unauthorized';

/**
 * ProtectedRoute component that checks for authentication and authorization
 * before allowing access to child routes.
 * 
 * @param {Object} props - Component props
 * @param {Array} [props.allowedRoles] - Array of roles allowed to access the route
 * @returns {JSX.Element} - Either the child routes or redirect to login/unauthorized
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen fullScreen />;
  }

  if (!token || !user) {
    // Redirect to login page, saving the current location to return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has any of the allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Unauthorized />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;