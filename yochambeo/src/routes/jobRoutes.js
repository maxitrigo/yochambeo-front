import axios from 'axios';

export const getAllJobs = async (page = 1) => {
  const limit = 10; // O el número que desees
  const response = await axios.get(`http://localhost:3000/jobs?page=${page}&limit=${limit}`);
  return response.data;
};

