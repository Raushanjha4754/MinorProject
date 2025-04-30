// admin-panel/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './features/auth/AdminLogin';
import AdminDashboard from './features/dashboard/AdminDashboard';
import StudentManagement from './features/students/StudentManagement';
import FeeManagement from './features/fees/FeeManagement';
import AttendanceTracking from './features/attendance/AttendanceTracking';
import MessManagement from './features/mess/MessManagement';

const adminTheme = createTheme({
  palette: {
    primary: { main: '#1a237e' }, // Darker blue for admin
    secondary: { main: '#ff5722' }, // Orange accent
    background: { default: '#ffffff' }
  }
});

function App() {
  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="fees" element={<FeeManagement />} />
            <Route path="attendance" element={<AttendanceTracking />} />
            <Route path="mess" element={<MessManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;