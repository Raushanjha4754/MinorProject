import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
  useTheme,
  TextField,
  Button,
  IconButton
} from "@mui/material";
import {
  Paid as FeesIcon,
  EventAvailable as AttendanceIcon,
  Restaurant as MessIcon,
  Person as PersonIcon,
  School as BranchIcon,
  Home as HostelIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Cake as DobIcon,
  Favorite as BloodIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  CameraAlt as CameraIcon
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useRef } from "react";

const StudentDashboard = () => {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [student, setStudent] = useState({
    name: "Krishna",
    rollNo: "2210000",
    profileImage: null,
    dob: "15-05-2003",
    fatherName: "Dev",
    branch: "INSTRUMENTATION AND CONTROL ENGINEERING",
    course: "B.Tech",
    year: "3rd Year",
    mobile: "9876543210",
    email: "krishna.ic.22@nitj.ac.in",
    hostel: "MBH-F",
    gender: "Male",
    bloodGroup: "O+",
    category: "General",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent({...student, profileImage: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const stats = [
    { title: "Pending Fees", value: "₹5,000", icon: <FeesIcon />, color: "error.main" },
    { title: "Attendance", value: "92%", icon: <AttendanceIcon />, color: "warning.main" },
    { title: "Mess Balance", value: "₹8,750", icon: <MessIcon />, color: "success.main" },
  ];

  const attendanceData = [
    { name: "Jan", present: 88 },
    { name: "Feb", present: 85 },
    { name: "Mar", present: 92 },
    { name: "Apr", present: 90 },
    { name: "May", present: 95 },
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#f5f7fa", p: 2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 2, pl: 1 }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={2} direction="column">
        {/* Student Profile Card with Photo */}
        <Grid item xs={12}>
          <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.primary.dark,
                mb: 3,
                textTransform: 'uppercase'
              }}>
                Details of the Candidate
              </Typography>
              
        

              <Grid container spacing={10}>
                {/* Photo Column */}
                <Grid item xs={12} md={3} sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <Avatar 
                    src="https://rukminim2.flixcart.com/image/850/1000/k3q76a80/poster/y/z/z/large-lord-krishna-painting-poster-waterproof-vinyl-wall-sticker-original-imafmrhcbgdcnugq.jpeg?q=90&crop=false" 
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mb: 2,
                      border: `3px solid ${theme.palette.primary.main}`,
                      boxShadow: 3
                    }} 
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
              
                  <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {student.name}
                  </Typography>
                  <Chip 
                    label={`Roll No: ${student.rollNo}`} 
                    color="primary" 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                </Grid>

                {/* Details Column */}
                <Grid item xs={12} md={9}>
                  <Grid container spacing={10}>
                    <Grid item xs={12} md={6}>
                      <DetailField label="Student Name" value={student.name} />
                      <DetailField label="Branch" value={student.branch} />
                      <DetailField label="Course" value={student.course} />
                      <DetailField label="Year" value={student.year} />
                      <DetailField label="Father's Name" value={student.fatherName} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      
                      <DetailField label="Date of Birth" value={student.dob} />
                      <DetailField label="Gender" value={student.gender} />
                      <DetailField label="Contact No." value={student.mobile} />
                      <DetailField label="Blood Group" value={student.bloodGroup} />
                      <DetailField label="Hostel" value={student.hostel} />
                    </Grid>
                    
                  </Grid>
                </Grid>
              </Grid>

          
            </CardContent>
          </Card>
        </Grid>

        {/* Rest of the dashboard components */}
        <Grid item xs={12}>
          <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Monthly Attendance
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Box sx={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />
                    <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="present" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center">
                    <Box sx={{ 
                      backgroundColor: stat.color, 
                      color: "white", 
                      p: 1.5, 
                      borderRadius: 1.5, 
                      mr: 1.5 
                    }}>
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Recent Notices
              </Typography>
              <Divider sx={{ mb: 1.5 }} />
              <NoticeItem 
                title="Hostel Maintenance" 
                date="15 Oct 2023" 
                content="Scheduled power outage from 10AM-2PM tomorrow." 
              />
              <NoticeItem 
                title="Mess Committee Meeting" 
                date="12 Oct 2023" 
                content="All hostel representatives required to attend." 
              />
              <NoticeItem 
                title="Cultural Fest" 
                date="5 Oct 2023" 
                content="Register for hostel cultural events by 20th Oct." 
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const DetailField = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" sx={{ 
      fontWeight: 'bold', 
      color: theme => theme.palette.text.secondary,
      mb: 0.5
    }}>
      {label}:
    </Typography>
    <Typography variant="body1" sx={{
      p: 1,
      pl: 2,
      backgroundColor: theme => theme.palette.grey[50],
      borderRadius: 1,
      borderLeft: theme => `3px solid ${theme.palette.primary.main}`
    }}>
      {value}
    </Typography>
  </Box>
);

const NoticeItem = ({ title, date, content }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
      {date}
    </Typography>
    <Typography variant="body2">{content}</Typography>
    <Divider sx={{ mt: 1.5 }} />
  </Box>
);

export default StudentDashboard;