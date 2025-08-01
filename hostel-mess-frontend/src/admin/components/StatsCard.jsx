
// src/admin/components/StatsCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Chip
} from '@mui/material';
import {
  People as PeopleIcon,
  Payment as PaymentIcon,
  Event as EventIcon,
  Report as ReportIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';

const StatsCard = ({ title, value, icon, color, trend }) => {
  const theme = useTheme();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'people':
        return <PeopleIcon />;
      case 'payment':
        return <PaymentIcon />;
      case 'event':
        return <EventIcon />;
      case 'report':
        return <ReportIcon />;
      default:
        return <PeopleIcon />;
    }
  };

  const getColor = (colorName) => {
    switch (colorName) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const iconColor = getColor(color);

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${iconColor}15`,
              color: iconColor,
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getIcon(icon)}
          </Box>
          {trend !== undefined && (
            <Chip
              icon={trend > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
              label={`${Math.abs(trend)}%`}
              size="small"
              color={trend > 0 ? 'success' : 'error'}
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>
        
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: theme.palette.text.primary }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;