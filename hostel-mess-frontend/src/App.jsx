import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import StudentLayout from "./layouts/StudentLayout";
import LoginForm from "./auth/LoginForm";
import StudentDashboard from "./features/dashboard/StudentDashboard";
import FeePayment from "./features/fees/FeePayment";
import AttendanceView from "./features/attendance/AttendanceView";
import MessMenu from "./features/mess/MessMenu";
import MessBilling from "./features/mess/MessBilling";
import ComplaintForm from './features/complaints/ComplaintForm';
import ComplaintList from './features/complaints/ComplaintList';

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="fee-payment" element={<FeePayment />} />
            <Route path="attendance" element={<AttendanceView />} />
            <Route path="mess-menu" element={<MessMenu />} />
            <Route path="mess-billing" element={<MessBilling />} />
            <Route path="submit-complaint" element={<ComplaintForm />} />
            <Route path="complaints" element={<ComplaintList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
