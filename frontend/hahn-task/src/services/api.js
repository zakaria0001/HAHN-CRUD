/* eslint-disable import/no-webpack-loader-syntax */
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8180/api', // Backend API base URL
  timeout: 5000,
});

export const getJobs = (filters = {}) => {
  const params = {};
  if (filters.category) params.category = filters.category;
  if (filters.title) params.title = filters.title;
  if (typeof filters.remote === 'boolean') params.remote = filters.remote;
  return api.get('/jobs/search', { params });
};

export const getJobById = (id) => api.get(`/jobs/${id}`);

export const createJob = (jobData) => api.post('/jobs', jobData);

export const updateJob = (id, jobData) => api.put(`/jobs/${id}`, jobData);

export const getApplicantsByJob = (jobId) => api.get(`/applicants/job/${jobId}`);

export const getCompanies = () => api.get('/companies');

export default api;
