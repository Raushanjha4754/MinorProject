/**
 * ============================================================================
 * Protected Route Component
 * Hostel Mess Management System - NIT Jalandhar
 * ============================================================================
 * 
 * This component protects routes that require authentication.
 * It checks if user is logged in and has the required role.
 * 
 * Uses React Router v6 pattern with Outlet for nested routes.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from './LoadingScreen';

/**
 * ProtectedRoute Component
 * 
 * Protects routes that require authentication and specific roles
 * 
 * @param {Object} props - Component props
 * @param {string[]} props.allowedRoles - Array of roles allowed to access this route
 * @returns {JSX.Element} Protected route component
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to appropriate dashboard if user doesn't have required role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  // User is authenticated and has required role - render nested routes
  return <Outlet />;
}