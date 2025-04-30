import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import MainLayout from './layouts/MainLayout';
// import LoginForm from './features/auth/LoginForm';
import Dashboard from './features/dashboard/Dashboard';
import StudentList from './features/students/StudentList';
// import RoomManagement from './features/rooms/RoomManagement';
// import FeeManagement from './features/fees/FeeManagement';
// import Attendance from './features/attendance/Attendance';
import MessManagement from './features/mess/MessManagement';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<StudentList />} />
            <Route path="rooms" element={<RoomManagement />} />
            <Route path="fees" element={<FeeManagement />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="mess" element={<MessManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;