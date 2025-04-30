import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  IconButton 
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import NitjLogo from '../assets/logo_nitj.png'; 

const NitjTopbar = () => {
  return (
    <AppBar 
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        color: 'inherit',
        boxShadow: 'none',
        width: '100%'
      }}
    >
      <Toolbar sx={{ 
        paddingLeft: '16px',
        paddingRight: '16px',
        minHeight: '64px'
      }}>
        {/* Left side - Logo and Institute Name */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '30px'
        }}>
          <Box
            component="img"
            src={NitjLogo}
            alt="NIT Jalandhar Logo"
            sx={{
              height: '80px',
              width: 'auto'
            }}
          />
          <Typography 
            variant="h6" 
            sx={{
              fontSize: '1.50rem',
              fontWeight: 500,
              lineHeight: 1.6,
              color: 'rgba(0, 0, 0, 0.87)'
            }}
          >
            DR B R AMBEDKAR NIT JALANDHAR
          </Typography>
        </Box>

        {/* Right side - Student Info and Logout */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          marginLeft: 'auto',
          gap: '8px'
        }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography 
              variant="subtitle2"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.57,
                color: 'rgba(0, 0, 0, 0.87)'
              }}
            >
              Krishna
            </Typography>
            <Typography 
              variant="caption"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 1.66,
                color: 'rgba(0, 0, 0, 0.6)'
              }}
            >
              22002200
            </Typography>
          </Box>
          
          
          <IconButton 
            size="small"
            aria-label="logout"
            sx={{
              padding: '8px',
              color: 'rgba(0, 0, 0, 0.54)'
            }}
          >
            <Logout fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NitjTopbar;