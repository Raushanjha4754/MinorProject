// src/admin/components/StatsCard.jsx
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import {
  People as PeopleIcon,
  Payment as PaymentIcon,
  Event as EventIcon,
  Report as ReportIcon,
} from '@mui/icons-material';

const iconMap = {
  people: PeopleIcon,
  payment: PaymentIcon,
  event: EventIcon,
  report: ReportIcon,
};

const colorMap = {
  primary: '#1976d2',
  error: '#d32f2f',
  success: '#2e7d32',
  warning: '#ed6c02',
};

const StatsCard = ({ title, value, icon, color }) => {
  const IconComponent = iconMap[icon] || PeopleIcon;
  const bgColor = colorMap[color] || '#1976d2';

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box sx={{ 
              backgroundColor: bgColor, 
              color: 'white', 
              p: 2, 
              borderRadius: 1, 
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IconComponent fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {value}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StatsCard;