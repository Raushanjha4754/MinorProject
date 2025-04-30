import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Circle } from '@mui/icons-material';

const activities = [
  { id: 1, text: 'New student Raushan Kumar Jha registered', time: '2 hours ago' },
  { id: 2, text: 'Fee payment received from Bhashkar Kumar', time: '5 hours ago' },
  { id: 3, text: 'Room A-101 maintenance completed', time: '1 day ago' },
  { id: 4, text: 'Monthly mess bill generated', time: '2 days ago' },
];

export default function RecentActivities() {
  return (
    <Box>
      <List>
        {activities.map((activity) => (
          <Box key={activity.id}>
            <ListItem>
              <Circle color="primary" sx={{ fontSize: 8, mr: 2 }} />
              <ListItemText
                primary={activity.text}
                secondary={activity.time}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
}