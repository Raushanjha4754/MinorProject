import { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  Search,
  Person,
  FilterList,
  Restaurant,
  Add,
  Edit,
  Delete,
  Today,
  CalendarMonth,
  Inventory,
  Receipt,
  Fastfood,
  LocalDining
} from '@mui/icons-material';
import MealPlanForm from './MealPlanForm';
import InventoryForm from './InventoryForm';

const MessManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMealPlanDialog, setOpenMealPlanDialog] = useState(false);
  const [openInventoryDialog, setOpenInventoryDialog] = useState(false);
  const [currentMealPlan, setCurrentMealPlan] = useState(null);
  const [currentInventoryItem, setCurrentInventoryItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inventoryFilter, setInventoryFilter] = useState('all');

  // Sample data
  const [mealPlans, setMealPlans] = useState([
    {
      id: 1,
      date: '2023-06-15',
      breakfast: 'Poha, Tea, Fruits',
      lunch: 'Roti, Dal, Rice, Vegetable, Curd',
      dinner: 'Roti, Rice, Dal, Paneer, Salad',
      specialDiet: 'Jain options available'
    },
    {
      id: 2,
      date: '2023-06-16',
      breakfast: 'Sandwich, Coffee, Fruits',
      lunch: 'Roti, Chole, Rice, Salad, Raita',
      dinner: 'Roti, Rice, Dal, Chicken Curry, Salad',
      specialDiet: 'Vegetarian options available'
    }
  ]);

  const [inventory, setInventory] = useState([
    {
      id: 1,
      item: 'Rice',
      category: 'Staple',
      quantity: 50,
      unit: 'kg',
      threshold: 10,
      lastUpdated: '2023-06-10'
    },
    {
      id: 2,
      item: 'Wheat Flour',
      category: 'Staple',
      quantity: 30,
      unit: 'kg',
      threshold: 15,
      lastUpdated: '2023-06-12'
    },
    {
      id: 3,
      item: 'Potatoes',
      category: 'Vegetable',
      quantity: 25,
      unit: 'kg',
      threshold: 5,
      lastUpdated: '2023-06-14'
    },
    {
      id: 4,
      item: 'Chicken',
      category: 'Meat',
      quantity: 8,
      unit: 'kg',
      threshold: 2,
      lastUpdated: '2023-06-15'
    }
  ]);

  const [attendance, setAttendance] = useState([
    {
      id: 1,
      date: '2023-06-15',
      breakfast: 180,
      lunch: 210,
      dinner: 195,
      total: 210
    },
    {
      id: 2,
      date: '2023-06-14',
      breakfast: 175,
      lunch: 205,
      dinner: 190,
      total: 210
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenMealPlanDialog = (plan = null) => {
    setCurrentMealPlan(plan);
    setOpenMealPlanDialog(true);
  };

  const handleCloseMealPlanDialog = () => {
    setOpenMealPlanDialog(false);
    setCurrentMealPlan(null);
  };

  const handleOpenInventoryDialog = (item = null) => {
    setCurrentInventoryItem(item);
    setOpenInventoryDialog(true);
  };

  const handleCloseInventoryDialog = () => {
    setOpenInventoryDialog(false);
    setCurrentInventoryItem(null);
  };

  const handleSaveMealPlan = (planData) => {
    if (planData.id) {
      // Update existing plan
      setMealPlans(mealPlans.map(p => p.id === planData.id ? planData : p));
    } else {
      // Add new plan
      const newId = Math.max(...mealPlans.map(p => p.id)) + 1;
      setMealPlans([...mealPlans, { ...planData, id: newId }]);
    }
    handleCloseMealPlanDialog();
  };

  const handleSaveInventoryItem = (itemData) => {
    if (itemData.id) {
      // Update existing item
      setInventory(inventory.map(i => i.id === itemData.id ? itemData : i));
    } else {
      // Add new item
      const newId = Math.max(...inventory.map(i => i.id)) + 1;
      setInventory([...inventory, { ...itemData, id: newId }]);
    }
    handleCloseInventoryDialog();
  };

  const handleDeleteInventoryItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const filteredMealPlans = mealPlans.filter(plan =>
    plan.date.includes(searchTerm) ||
    plan.breakfast.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.lunch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.dinner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (inventoryFilter === 'all') return matchesSearch;
    if (inventoryFilter === 'low') return matchesSearch && item.quantity < item.threshold;
    return matchesSearch && item.category === inventoryFilter;
  });

  const getInventoryStatusColor = (quantity, threshold) => {
    return quantity < threshold ? 'error' : 'success';
  };

  const todayAttendance = attendance.find(a => a.date === selectedDate.toISOString().split('T')[0]) || {};

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Mess Management</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            startIcon={<LocalDining />}
            onClick={() => handleOpenMealPlanDialog()}
          >
            Add Meal Plan
          </Button>
        </Box>
      </Box>

      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="Meal Planning" icon={<Fastfood />} />
        <Tab label="Inventory" icon={<Inventory />} />
        <Tab label="Attendance" icon={<Receipt />} />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={3}
            gap={2}
          >
            <TextField
              label="Search Meal Plans"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <Search />,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
            >
              Filters
            </Button>
          </Box>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            {filteredMealPlans.slice(0, 2).map((plan) => (
              <Grid item xs={12} md={6} key={plan.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" color="primary">
                        {new Date(plan.date).toDateString()}
                      </Typography>
                      <IconButton 
                        color="primary"
                        onClick={() => handleOpenMealPlanDialog(plan)}
                      >
                        <Edit />
                      </IconButton>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box mb={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Breakfast
                      </Typography>
                      <Typography>{plan.breakfast}</Typography>
                    </Box>
                    <Box mb={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Lunch
                      </Typography>
                      <Typography>{plan.lunch}</Typography>
                    </Box>
                    <Box mb={2}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Dinner
                      </Typography>
                      <Typography>{plan.dinner}</Typography>
                    </Box>
                    {plan.specialDiet && (
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Special Diet
                        </Typography>
                        <Typography>{plan.specialDiet}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'background.default' }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Breakfast</TableCell>
                  <TableCell>Lunch</TableCell>
                  <TableCell>Dinner</TableCell>
                  <TableCell>Special Diet</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMealPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      {new Date(plan.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>{plan.breakfast}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>{plan.lunch}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>{plan.dinner}</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>{plan.specialDiet || '-'}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        color="primary"
                        onClick={() => handleOpenMealPlanDialog(plan)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {tabValue === 1 && (
        <>
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={3}
            gap={2}
          >
            <TextField
              label="Search Inventory"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: <Search />,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Box display="flex" gap={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={inventoryFilter}
                  label="Filter"
                  onChange={(e) => setInventoryFilter(e.target.value)}
                >
                  <MenuItem value="all">All Items</MenuItem>
                  <MenuItem value="low">Low Stock</MenuItem>
                  <MenuItem value="Staple">Staple</MenuItem>
                  <MenuItem value="Vegetable">Vegetable</MenuItem>
                  <MenuItem value="Meat">Meat</MenuItem>
                  <MenuItem value="Dairy">Dairy</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenInventoryDialog()}
              >
                Add Item
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'background.default' }}>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Threshold</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{item.item}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity} {item.unit}</TableCell>
                    <TableCell>{item.threshold} {item.unit}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.quantity < item.threshold ? 'Low Stock' : 'In Stock'}
                        color={getInventoryStatusColor(item.quantity, item.threshold)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        color="primary"
                        onClick={() => handleOpenInventoryDialog(item)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        color="error"
                        onClick={() => handleDeleteInventoryItem(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {tabValue === 2 && (
        <>
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={3}
            gap={2}
          >
            <TextField
              label="Select Date"
              type="date"
              variant="outlined"
              size="small"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<Today />}
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="contained"
                startIcon={<Restaurant />}
              >
                Mark Attendance
              </Button>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Breakfast
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {todayAttendance.breakfast || 0}
                  </Typography>
                  <Typography variant="body2">
                    out of {todayAttendance.total || 0} students
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Lunch
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {todayAttendance.lunch || 0}
                  </Typography>
                  <Typography variant="body2">
                    out of {todayAttendance.total || 0} students
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Dinner
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {todayAttendance.dinner || 0}
                  </Typography>
                  <Typography variant="body2">
                    out of {todayAttendance.total || 0} students
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'background.default' }}>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Breakfast</TableCell>
                  <TableCell align="right">Lunch</TableCell>
                  <TableCell align="right">Dinner</TableCell>
                  <TableCell align="right">Total Students</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">{record.breakfast}</TableCell>
                    <TableCell align="right">{record.lunch}</TableCell>
                    <TableCell align="right">{record.dinner}</TableCell>
                    <TableCell align="right">{record.total}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Meal Plan Form Dialog */}
      <Dialog 
        open={openMealPlanDialog} 
        onClose={handleCloseMealPlanDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentMealPlan ? 'Edit Meal Plan' : 'Add New Meal Plan'}
        </DialogTitle>
        <DialogContent>
          <MealPlanForm 
            plan={currentMealPlan} 
            onSave={handleSaveMealPlan} 
            onCancel={handleCloseMealPlanDialog} 
          />
        </DialogContent>
      </Dialog>

      {/* Inventory Form Dialog */}
      <Dialog 
        open={openInventoryDialog} 
        onClose={handleCloseInventoryDialog}
      >
        <DialogTitle>
          {currentInventoryItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        </DialogTitle>
        <DialogContent>
          <InventoryForm 
            item={currentInventoryItem} 
            onSave={handleSaveInventoryItem} 
            onCancel={handleCloseInventoryDialog} 
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MessManagement;