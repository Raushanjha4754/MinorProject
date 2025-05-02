// src/admin/api/feeApi
import axios from 'axios';

const API_URL = '/api/v1/fees';

const getAllFees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const createFee = async (feeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, feeData, config);
  return response.data;
};

const updateFee = async (feeId, feeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${feeId}`, feeData, config);
  return response.data;
};

const deleteFee = async (feeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${feeId}`, config);
  return response.data;
};

const feeApi = {
  getAllFees,
  createFee,
  updateFee,
  deleteFee,
};

export default feeApi;