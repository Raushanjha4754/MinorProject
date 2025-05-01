import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { LockReset } from '@mui/icons-material';
import api from '../../api/adminApi';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      // Filter to show only students or manage all users based on your needs
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (userId) => {
    try {
      await api.activateUser(userId);
      setUsers(users.map(user => 
        user.id === userId ? {...user, isActive: true} : user
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await api.deactivateUser(userId);
      setUsers(users.map(user => 
        user.id === userId ? {...user, isActive: false} : user
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async (userId) => {
    const newPassword = prompt("Enter new password:");
    if (newPassword) {
      try {
        await api.resetPassword(userId, newPassword);
        alert("Password reset successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to reset password");
      }
    }
  };

  const columns = [
    { field: 'rollNumber', headerName: 'Roll Number', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 120 },
    { 
      field: 'isActive', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        params.value ? 'Active' : 'Inactive'
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <>
          {params.row.isActive ? (
            <Button 
              variant="outlined" 
              color="error"
              size="small"
              onClick={() => handleDeactivate(params.row.id)}
              sx={{ mr: 1 }}
              disabled={params.row.role === 'admin'} // Prevent deactivating admins
            >
              Deactivate
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="success"
              size="small"
              onClick={() => handleActivate(params.row.id)}
              sx={{ mr: 1 }}
            >
              Activate
            </Button>
          )}
          <IconButton 
            color="primary"
            onClick={() => handleResetPassword(params.row.id)}
          >
            <LockReset />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        loading={loading}
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default UserList;