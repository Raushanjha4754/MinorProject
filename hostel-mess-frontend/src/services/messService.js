// import axios from 'axios';

// const API_URL = '/api/mess';

// const getWeeklyMenu = async (weekOffset = 0) => {
//   const response = await axios.get(`${API_URL}/menu?week=${weekOffset}`);
//   return response.data;
// };

// const submitMealRating = async (data) => {
//   const response = await axios.post(`${API_URL}/ratings`, data);
//   return response.data;
// };

// const submitSpecialRequest = async (data) => {
//   const response = await axios.post(`${API_URL}/special-requests`, data);
//   return response.data;
// };

// export default {
//   getWeeklyMenu,
//   submitMealRating,
//   submitSpecialRequest
// };

// src/services/messService.js

// Mock data for weekly menu
// src/services/messService.js
const mockWeeklyMenu = [
  {
    week: "Current Week",
    days: [
      { day: "Monday", breakfast: "Poha + Tea", lunch: "Dal-Rice + Salad", dinner: "Roti-Sabji" },
      { day: "Tuesday", breakfast: "Sandwich + Milk", lunch: "Rajma-Rice", dinner: "Pulao + Raita" },
      { day: "Wednesday", breakfast: "Idli-Sambar", lunch: "Chole-Bhature", dinner: "Paratha-Curd" },
      { day: "Thursday", breakfast: "Cornflakes + Fruits", lunch: "Vegetable Biryani", dinner: "Khichdi" },
      { day: "Friday", breakfast: "Utappam", lunch: "Sambar-Rice", dinner: "Noodles" },
      { day: "Saturday", breakfast: "Dosa + Chutney", lunch: "Thali", dinner: "Frankie" },
      { day: "Sunday", breakfast: "Pancakes", lunch: "Butter Chicken + Naan", dinner: "Sandwich" }
    ]
  },
  {
    week: "Next Week",
    days: [
      { day: "Monday", breakfast: "Upma", lunch: "Kadhi-Chawal", dinner: "Dal-Roti" },
      //... similar structure for other days
    ]
  }
];

export default {
  getWeeklyMenu: async (weekOffset = 0) => {
    return mockWeeklyMenu[weekOffset] || mockWeeklyMenu[0];
  },
  submitMealRating: async () => ({ success: true }),
  submitSpecialRequest: async () => ({ success: true })
};