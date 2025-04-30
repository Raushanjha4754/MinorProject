import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  MeetingRoom,
  SingleBed,
  Hotel,
  People
} from '@mui/icons-material';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      number: 'A-101',
      type: 'Single',
      capacity: 1,
      currentOccupancy: 1,
      status: 'Occupied',
      floor: '1st Floor',
      rate: 15000
    },
    {
      id: 2,
      number: 'A-102',
      type: 'Double',
      capacity: 2,
      currentOccupancy: 1,
      status: 'Available',
      floor: '1st Floor',
      rate: 10000
    },
    {
      id: 3,
      number: 'B-201',
      type: 'Dormitory',
      capacity: 4,
      currentOccupancy: 3,
      status: 'Partially Occupied',
      floor: '2nd Floor',
      rate: 8000
    },
    {
      id: 4,
      number: 'B-202',
      type: 'Double',
      capacity: 2,
      currentOccupancy: 0,
      status: 'Available',
      floor: '2nd Floor',
      rate: 10000
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleOpenDialog = (room = null) => {
    setCurrentRoom(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRoom(null);
  };

  const handleSaveRoom = (roomData) => {
    if (roomData.id) {
      // Update existing room
      setRooms(rooms.map(r => r.id === roomData.id ? roomData : r));
    } else {
      // Add new room
      const newId = Math.max(...rooms.map(r => r.id)) + 1;
      setRooms([...rooms, { ...roomData, id: newId }]);
    }
    handleCloseDialog();
  };

  const handleDeleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const filteredRooms = rooms.filter(room =>
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.floor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoomIcon = (type) => {
    switch (type) {
      case 'Single': return <SingleBed />;
      case 'Double': return <Hotel />;
      case 'Dormitory': return <People />;
      default: return <MeetingRoom />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Occupied': return 'error';
      case 'Available': return 'success';
      case 'Partially Occupied': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Room Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Room
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          label="Search Rooms"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <Search />,
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'background.default' }}>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Rate (₹)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {getRoomIcon(room.type)}
                    <Typography fontWeight="bold">{room.number}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>
                  {room.currentOccupancy}/{room.capacity}
                </TableCell>
                <TableCell>{room.floor}</TableCell>
                <TableCell>{room.rate.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={room.status}
                    color={getStatusColor(room.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    color="primary"
                    onClick={() => handleOpenDialog(room)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Room Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentRoom ? 'Edit Room' : 'Add New Room'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 400, pt: 2 }}>
            <TextField
              label="Room Number"
              fullWidth
              margin="normal"
              value={currentRoom?.number || ''}
              onChange={(e) => setCurrentRoom({...currentRoom, number: e.target.value})}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Room Type</InputLabel>
              <Select
                value={currentRoom?.type || ''}
                label="Room Type"
                onChange={(e) => setCurrentRoom({...currentRoom, type: e.target.value})}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
                <MenuItem value="Dormitory">Dormitory</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Capacity"
              type="number"
              fullWidth
              margin="normal"
              value={currentRoom?.capacity || ''}
              onChange={(e) => setCurrentRoom({...currentRoom, capacity: parseInt(e.target.value)})}
            />
            
            <TextField
              label="Floor"
              fullWidth
              margin="normal"
              value={currentRoom?.floor || ''}
              onChange={(e) => setCurrentRoom({...currentRoom, floor: e.target.value})}
            />
            
            <TextField
              label="Monthly Rate (₹)"
              type="number"
              fullWidth
              margin="normal"
              value={currentRoom?.rate || ''}
              onChange={(e) => setCurrentRoom({...currentRoom, rate: parseInt(e.target.value)})}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => handleSaveRoom(currentRoom)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomManagement;