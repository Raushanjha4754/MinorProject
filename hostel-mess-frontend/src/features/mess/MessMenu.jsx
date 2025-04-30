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
  Divider
} from '@mui/material';

const MessMenu = () => {
  const menuData = [
    {
      day: 'MONDAY',
      breakfast: 'Poha, Vegetable Oats, Tea',
      lunch: 'Rajma, Roti, Rice, Masala Mix Raita',
      snacks: 'Noodle Burger',
      dinner: 'Bhindi pyaz, Roti, Dal Tadka, Rice, Ice Cream'
    },
    {
      day: 'TUESDAY',
      breakfast: 'Veg Besan Chilla, green and sweet chutney',
      lunch: 'Paneer Butter Masala + Masar Dal + Rice + papad',
      snacks: 'Chana Samosa',
      dinner: 'Mix veg, Dal Makhni, Roti, Rice, Sponge Rasgulla'
    },
    {
      day: 'WEDNESDAY',
      breakfast: 'Bedmi poori, Bhaji, Tea',
      lunch: 'Kadi pakoda, Aloo jeera, Roti, Rice',
      snacks: 'Tea',
      dinner: 'Lababdar Chicken/Paneer Chilli, Roti, Rice, Dal Tadka'
    },
    {
      day: 'THURSDAY',
      breakfast: 'Idli, Vada, Sambhar, Tea',
      lunch: 'Gobi Aloo, Boondi Raita, Veg Pulao, Moong Dal, Roti',
      snacks: 'Tikki',
      dinner: 'Kashmiri Aloo Dum, Jeera rice, Masar Dal, Roti, Ice Cream'
    },
    {
      day: 'FRIDAY',
      breakfast: 'Aloo Pyaz Paratha, Butter, Tea',
      lunch: 'Puri chhole sabzi rice',
      snacks: 'Red Sauce Pasta',
      dinner: 'Paneer Bhurji / Egg Curry, Moong Dhuli Dal, Roti, Rice, Kheer'
    },
    {
      day: 'SATURDAY',
      breakfast: 'Dosa, Uttapam, Chutney, Sambhar, Tea',
      lunch: 'Seasonal Veg, Dal makhni, Roti, Jeera Rice',
      snacks: 'Dahi Bhalla',
      dinner: 'Gheeya Kofta/Gatte Ki Sabji, Channa Dal, Rice, Roti, Rasmalai'
    },
    {
      day: 'SUNDAY',
      breakfast: 'Amritsari Naan Chhole, Butter, Tea',
      lunch: 'Aloo Bhujia, Arhar dal, Papad, Rice, Roti',
      snacks: 'Tea',
      dinner: 'Kadai Chicken/Matar Paneer, Moong Masur Dhuli Dal, Roti, Rice'
    },
    {
      day: 'DAILY',
      breakfast: 'Pickle, Tea, Sauce, Jam, Bread, Peanut Butter, Omelette, Corn Flakes',
      lunch: 'Salad (Kheera, Onion, BeetRoot), Pickle, Saunf',
      snacks: 'Tea',
      dinner: ''
    },
    {
      day: 'EXTRA',
      breakfast: 'Butter, Curd Packet, Bread Slices, Fresh Fruits, Boiled Eggs, Omelette',
      lunch: 'Curd Packet, Omelette, Egg Bhurji, Lassi, Seasonal Fruit',
      snacks: '',
      dinner: 'Milk Packet, Curd Packet, Hot Milk, Omelette, Egg Bhurji'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#003366' }}>
        Mega Boys Hostel-Mess Menu
      </Typography>
      
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="mess menu">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>DAYS</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>BREAKFAST</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>LUNCH</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>SNACKS</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DINNER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuData.map((row) => (
              <TableRow key={row.day}>
                <TableCell sx={{ fontWeight: 500 }}>{row.day}</TableCell>
                <TableCell>{row.breakfast}</TableCell>
                <TableCell>{row.lunch}</TableCell>
                <TableCell>{row.snacks}</TableCell>
                <TableCell>{row.dinner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          <strong>NOTE:</strong> Extra items available on that day only. Menu will be followed according to the availability of material.
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
      </Box>
    </Box>
  );
};

export default MessMenu;