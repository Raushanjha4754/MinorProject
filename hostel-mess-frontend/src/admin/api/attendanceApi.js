// src/admin/api/attendanceApi
import axios from 'axios';

const API_URL = '/api/v1/attendance';

const getAllAttendance = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const markAttendance = async (attendanceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, attendanceData, config);
  return response.data;
};

const updateAttendance = async (attendanceId, attendanceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${attendanceId}`, attendanceData, config);
  return response.data;
};

const approveLeave = async (attendanceId, statusData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${attendanceId}/approve`, statusData, config);
  return response.data;
};

const deleteAttendance = async (attendanceId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${attendanceId}`, config);
  return response.data;
};

const attendanceApi = {
  getAllAttendance,
  markAttendance,
  updateAttendance,
  approveLeave,
  deleteAttendance,
};

export default attendanceApi;