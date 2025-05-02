// src/admin/api/messApi
import axios from 'axios';

const API_URL = '/api/v1/mess';

const getAllMenus = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/menu`, config);
  return response.data;
};

const createMenu = async (menuData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/menu`, menuData, config);
  return response.data;
};

const updateMenu = async (menuId, menuData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/menu/${menuId}`, menuData, config);
  return response.data;
};

const deleteMenu = async (menuId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/menu/${menuId}`, config);
  return response.data;
};

const getAllBilling = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/billing/all`, config);
  return response.data;
};

const createBilling = async (billingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/billing`, billingData, config);
  return response.data;
};

const updateBilling = async (billingId, billingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/billing/${billingId}`, billingData, config);
  return response.data;
};

const deleteBilling = async (billingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/billing/${billingId}`, config);
  return response.data;
};

const messApi = {
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  getAllBilling,
  createBilling,
  updateBilling,
  deleteBilling,
};

export default messApi;