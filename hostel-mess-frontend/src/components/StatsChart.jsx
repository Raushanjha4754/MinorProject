import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', students: 200, fees: 120000 },
  { name: 'Feb', students: 210, fees: 135000 },
  { name: 'Mar', students: 225, fees: 145000 },
  { name: 'Apr', students: 230, fees: 150000 },
  { name: 'May', students: 240, fees: 160000 },
  { name: 'Jun', students: 245, fees: 165000 },
];

export default function StatsChart() {
  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Bar yAxisId="left" dataKey="students" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="fees" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="caption" display="block" textAlign="center">
        Monthly Students and Fee Collection
      </Typography>
    </Box>
  );
}