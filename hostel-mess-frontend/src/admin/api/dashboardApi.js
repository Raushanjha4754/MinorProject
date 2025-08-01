// src/admin/api/dashboard.js
import { getAdminStats } from '../../api';

const dashboardApi = {
  getAdminStats: async (token) => {
    try {
      const response = await getAdminStats();
      return response;
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      throw error;
    }
  }
};

export default dashboardApi;