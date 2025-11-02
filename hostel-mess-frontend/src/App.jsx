/**
 * ============================================================================
 * Main Application Component
 * Hostel Mess Management System - NIT Jalandhar
 * ============================================================================
 * 
 * This component serves as the root of the application and sets up:
 * - Material-UI theme provider
 * - Authentication context
 * - React Router for navigation
 * - Date localization provider
 * 
 * Routes are organized into three categories:
 * 1. Public routes (login, admin registration)
 * 2. Protected student routes (dashboard, fees, attendance, etc.)
 * 3. Protected admin routes (management pages)
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import theme from './theme/theme';

// Route Protection Components
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Authentication Components
import LoginForm from "./auth/LoginForm";
import AdminRegisterForm from './auth/AdminRegisterForm';

// Layout Components
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./admin/AdminLayout";

// Student Feature Components
import StudentDashboard from "./features/dashboard/StudentDashboard";
import FeePayment from "./features/fees/FeePayment";
import AttendanceView from "./features/attendance/AttendanceView";
import MessMenu from "./features/mess/MessMenu";
import MessBilling from "./features/mess/MessBilling";
import ComplaintForm from './features/complaints/ComplaintForm';
import ComplaintList from './features/complaints/ComplaintList';

// Admin Management Components
import AdminDashboard from './admin/Dashboard';
import StudentManagement from './admin/StudentManagement';
import AttendanceManagement from './admin/AttendanceManagement';
import FeeManagement from './admin/FeeManagement';
import MessManagement from './admin/MessManagement';
import Settings from './admin/Settings';

/**
 * Main App Component
 * @returns {JSX.Element} The root application component
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* ==================================================================
                  PUBLIC ROUTES - Accessible without authentication
                  ================================================================== */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/admin/register" element={<AdminRegisterForm />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Route>

              {/* ==================================================================
                  PROTECTED STUDENT ROUTES - Requires student authentication
                  ================================================================== */}
              <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student" element={<StudentLayout />}>
                  <Route index element={<StudentDashboard />} />
                  <Route path="fee-payment" element={<FeePayment />} />
                  <Route path="attendance" element={<AttendanceView />} />
                  <Route path="mess-menu" element={<MessMenu />} />
                  <Route path="mess-billing" element={<MessBilling />} />
                  <Route path="submit-complaint" element={<ComplaintForm />} />
                  <Route path="complaints" element={<ComplaintList />} />
                </Route>
              </Route>

              {/* ==================================================================
                  PROTECTED ADMIN ROUTES - Requires admin authentication
                  ================================================================== */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="manage-students" element={<StudentManagement />} />
                  <Route path="manage-attendance" element={<AttendanceManagement />} />
                  <Route path="manage-fees" element={<FeeManagement />} />
                  <Route path="mess-management" element={<MessManagement />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>

              {/* ==================================================================
                  FALLBACK ROUTE - Redirect unknown routes to login
                  ================================================================== */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;