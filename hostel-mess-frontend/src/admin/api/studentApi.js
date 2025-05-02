// src/admin/api/studentApi
import axios from 'axios';

const API_URL = '/api/v1/students';

const getAllStudents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const createStudent = async (studentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, studentData, config);
  return response.data;
};

const updateStudent = async (studentId, studentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}/${studentId}`, studentData, config);
  return response.data;
};

const deleteStudent = async (studentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${studentId}`, config);
  return response.data;
};

const studentApi = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentApi;