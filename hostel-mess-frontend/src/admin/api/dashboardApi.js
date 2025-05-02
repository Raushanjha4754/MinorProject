// src/admin/api/dashboard.js
import axios from 'axios';

const API_URL = '/api/v1/dashboard';

const getAdminStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/admin`, config);
  return response.data;
};

const dashboardApi = {
  getAdminStats,
};

export default dashboardApi;