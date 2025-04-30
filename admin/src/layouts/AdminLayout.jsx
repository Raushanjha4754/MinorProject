// admin-panel/src/layouts/AdminLayout.jsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ 
        flexGrow: 1,
        p: 3,
        marginLeft: '280px', // Wider sidebar
        backgroundColor: '#f8f9fa'
      }}>
        <AdminTopbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;