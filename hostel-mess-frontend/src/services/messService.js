// src/services/messService
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