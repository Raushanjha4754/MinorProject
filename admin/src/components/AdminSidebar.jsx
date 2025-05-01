import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { People, PersonAdd } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div style={{ width: 250 }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/users/create">
          <ListItemIcon><PersonAdd /></ListItemIcon>
          <ListItemText primary="Create User" />
        </ListItem>
      </List>
    </div>
  );
};

export default AdminSidebar;