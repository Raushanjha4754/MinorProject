// src/features/mess/MessBilling.jsx
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Receipt,
  History,
  Payment,
  Download,
  Print,
  CalendarMonth,
  Person
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// 🔧 Mock service functions (replace with real API calls)
const messBillingService = {
  getStudentBilling: async (month, year) => ({
    totalDue: 1200,
    paidAmount: 800,
    upcomingCharges: 400,
    paymentHistory: [
      { date: '2025-04-01', amount: 400 },
      { date: '2025-04-15', amount: 400 }
    ],
    upcomingBills: [
      { date: '2025-05-05', amount: 200 },
      { date: '2025-05-20', amount: 200 }
    ]
  }),
  getDailyBilling: async (month, year) => [
    {
      date: '2025-04-01',
      breakfast: true,
      lunch: true,
      dinner: true,
      extraItems: ['Juice'],
      total: 90
    },
    {
      date: '2025-04-02',
      breakfast: false,
      lunch: true,
      dinner: true,
      extraItems: [],
      total: 70
    }
  ]
};

// ⬛ Reusable Card Component
const BillingSummaryCard = ({ title, amount, color, icon }) => (
  <Paper elevation={3} style={{ padding: 16 }}>
    <Box display="flex" alignItems="center" gap={2}>
      {icon}
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h6" color={color}>
          ₹{amount}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

// ⬛ Payment History Table
const PaymentHistoryTable = ({ data }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((payment, idx) => (
          <TableRow key={idx}>
            <TableCell>{payment.date}</TableCell>
            <TableCell align="right">₹{payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// ⬛ Upcoming Charges Table
const UpcomingCharges = ({ data, onPayNow }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((bill, idx) => (
          <TableRow key={idx}>
            <TableCell>{bill.date}</TableCell>
            <TableCell align="right">₹{bill.amount}</TableCell>
            <TableCell align="right">
              <Button
                variant="outlined"
                size="small"
                onClick={() => onPayNow(bill.amount)}
              >
                Pay Now
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// 🔷 Main Component
const MessBilling = () => {
  const [tabValue, setTabValue] = useState(0);
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dailyBillingData, setDailyBillingData] = useState([]);

  const months = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      value: date.getMonth(),
      label: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear()
    };
  });

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const data = await messBillingService.getStudentBilling(selectedMonth, selectedYear);
        setBillingData(data);

        if (tabValue === 2) {
          const dailyData = await messBillingService.getDailyBilling(selectedMonth, selectedYear);
          setDailyBillingData(dailyData);
        }
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBillingData();
  }, [selectedMonth, selectedYear, tabValue]);

  const handlePayNow = (amount) => {
    console.log('Initiating payment of ₹', amount);
  };

  const handleExport = () => {
    const excelData = [
      ['Date', 'Breakfast', 'Lunch', 'Dinner', 'Extra Items', 'Total'],
      ...dailyBillingData.map((day) => [
        day.date,
        day.breakfast ? '✓' : '',
        day.lunch ? '✓' : '',
        day.dinner ? '✓' : '',
        day.extraItems.join(', '),
        day.total
      ])
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, `Billing_${selectedMonth + 1}_${selectedYear}`);
    XLSX.writeFile(wb, `mess_billing_${selectedMonth + 1}_${selectedYear}.xlsx`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          <Receipt sx={{ verticalAlign: 'middle', mr: 1 }} />
          My Mess Billings
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
              startAdornment={<CalendarMonth sx={{ mr: 1 }} />}
            >
              {months.map((month) => (
                <MenuItem key={`${month.year}-${month.value}`} value={month.value}>
                  {month.label} {month.year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<Download />} onClick={handleExport}>
            Export Excel
          </Button>
          <Button variant="outlined" startIcon={<Print />}>
            Print
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <BillingSummaryCard
            title="Total Due"
            amount={billingData?.totalDue || 0}
            color="error"
            icon={<Payment color="error" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BillingSummaryCard
            title="Paid This Month"
            amount={billingData?.paidAmount || 0}
            color="success"
            icon={<Receipt color="success" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BillingSummaryCard
            title="Upcoming Charges"
            amount={billingData?.upcomingCharges || 0}
            color="warning"
            icon={<History color="warning" />}
          />
        </Grid>
      </Grid>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Payment History" icon={<History />} />
        <Tab label="Upcoming Charges" icon={<Payment />} />
        <Tab label="Daily Consumption" icon={<Person />} />
      </Tabs>

      {tabValue === 0 && (
        <PaymentHistoryTable data={billingData?.paymentHistory || []} />
      )}

      {tabValue === 1 && (
        <UpcomingCharges data={billingData?.upcomingBills || []} onPayNow={handlePayNow} />
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Daily Meal Consumption - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Breakfast</TableCell>
                  <TableCell align="center">Lunch</TableCell>
                  <TableCell align="center">Dinner</TableCell>
                  <TableCell>Extra Items</TableCell>
                  <TableCell align="right">Daily Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyBillingData.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell align="center">{day.breakfast ? '✓' : '✗'}</TableCell>
                    <TableCell align="center">{day.lunch ? '✓' : '✗'}</TableCell>
                    <TableCell align="center">{day.dinner ? '✓' : '✗'}</TableCell>
                    <TableCell>{day.extraItems.join(', ')}</TableCell>
                    <TableCell align="right">₹{day.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography variant="subtitle1">Monthly Total:</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      ₹{dailyBillingData.reduce((sum, day) => sum + day.total, 0).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {billingData?.totalDue > 0 && tabValue !== 2 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Payment />}
            onClick={() => handlePayNow(billingData.totalDue)}
            sx={{ px: 5, py: 1.5, borderRadius: 3 }}
          >
            Pay ₹{billingData.totalDue.toLocaleString()}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MessBilling;
