import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getAllJobs = async (page = 1) => {
  const limit = 10; // O el número que desees
  const response = await axios.get(`${API_URL}/jobs?page=${page}&limit=${limit}`);
  return response.data;
};

export const createJob = async (jobData) => {
  await axios.post(`${API_URL}/jobs`, jobData);
};

