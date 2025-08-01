import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from './context/AuthContext';
import theme from './theme/theme';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import LoginForm from "./auth/LoginForm";
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./admin/AdminLayout";
import StudentDashboard from "./features/dashboard/StudentDashboard";
import FeePayment from "./features/fees/FeePayment";
import AttendanceView from "./features/attendance/AttendanceView";
import MessMenu from "./features/mess/MessMenu";
import MessBilling from "./features/mess/MessBilling";
import ComplaintForm from './features/complaints/ComplaintForm';
import ComplaintList from './features/complaints/ComplaintList';
import AdminDashboard from './admin/Dashboard';
import StudentManagement from './admin/StudentManagement';
import AttendanceManagement from './admin/AttendanceManagement';
import FeeManagement from './admin/FeeManagement';
import MessManagement from './admin/MessManagement';
import Settings from './admin/Settings';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { NotFound } from './components/NotFound';
// import { LoadingScreen } from './components/LoadingScreen';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
      {/* <BrowserRouter> */}
          <Routes>
            {/* ADMIN */}
            <Route path="/admin" element={<AdminLayout/>}>
              <Route index element={<AdminDashboard />} />
              <Route path="manage-students" element={<StudentManagement />} />
              <Route path="manage-attendance" element={<AttendanceManagement />} />
              <Route path="manage-fees" element={<FeeManagement />} />
              <Route path="mess-management" element={<MessManagement />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* STUDENT */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="fee-payment" element={<FeePayment />} />
              <Route path="attendance" element={<AttendanceView />} />
              <Route path="mess-menu" element={<MessMenu />} />
              <Route path="mess-billing" element={<MessBilling />} />
              <Route path="submit-complaint" element={<ComplaintForm />} />
              <Route path="complaints" element={<ComplaintList />} />
            </Route>


            {/* Public Routes */}
            <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>

            {/* Protected Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              {/* <Route path="/student" element={<StudentLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="fee-payment" element={<FeePayment />} />
                <Route path="attendance" element={<AttendanceView />} />
                <Route path="mess-menu" element={<MessMenu />} />
                <Route path="mess-billing" element={<MessBilling />} />
                <Route path="submit-complaint" element={<ComplaintForm />} />
                <Route path="complaints" element={<ComplaintList />} />
              </Route> */}
            </Route>

            {/* Protected Admin Routes */}
            {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout/>}>
                <Route index element={<AdminDashboard />} />
                <Route path="manage-students" element={<StudentManagement />} />
                <Route path="manage-attendance" element={<AttendanceManagement />} />
                <Route path="manage-fees" element={<FeeManagement />} />
                <Route path="mess-management" element={<MessManagement />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route> */}

            {/* Redirect to login if no matching route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          {/* </BrowserRouter> */}
      </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;