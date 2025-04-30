import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import LoginForm from "./auth/LoginForm";
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./features/dashboard/StudentDashboard";
import FeePayment from "./features/fees/FeePayment";
import AttendanceView from "./features/attendance/AttendanceView";
import MessMenu from "./features/mess/MessMenu";
import MessBilling from "./features/mess/MessBilling";
import ComplaintForm from './features/complaints/ComplaintForm';
import ComplaintList from './features/complaints/ComplaintList';
import { NotFound } from './components/NotFound';
import { LoadingScreen } from './components/LoadingScreen';


const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    // Add more responsive typography settings as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginForm />} />
            </Route>

            {/* Protected student routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/" element={<StudentLayout />}>
                <Route index element={<StudentDashboard />} />
                <Route path="fee-payment" element={<FeePayment />} />
                <Route path="attendance" element={<AttendanceView />} />
                <Route path="mess-menu" element={<MessMenu />} />
                <Route path="mess-billing" element={<MessBilling />} />
                <Route path="submit-complaint" element={<ComplaintForm />} />
                <Route path="complaints" element={<ComplaintList />} />
              </Route>
            </Route>

            {/* Admin routes would go here */}
            {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminLayout />}>
                ...
              </Route>
            </Route> */}

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;