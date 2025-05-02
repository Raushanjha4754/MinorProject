// src/admin/api/complaintApi
import axios from 'axios';

const API_URL = '/api/v1/complaints';

const getAllComplaints = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const resolveComplaint = async (complaintId, resolutionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${complaintId}/resolve`, resolutionData, config);
  return response.data;
};

const complaintApi = {
  getAllComplaints,
  resolveComplaint,
};

export default complaintApi;