// src/layouts/StudentLayout.jsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/StudentSidebar';
import StudentTopbar from '../components/StudentTopbar';

const StudentLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StudentSidebar />
      <Box component="main" sx={{ 
        flexGrow: 1,
        p: 3,
        marginLeft: '240px', // Matches sidebar width
        backgroundColor: '#f5f5f5'
      }}>
        <StudentTopbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentLayout;