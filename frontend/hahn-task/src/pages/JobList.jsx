import React, { useState, useEffect } from 'react';
import { getJobs } from '../services/api';

const JobList=()=> {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [remote, setRemote] = useState('');
  const [title, setTitle] = useState('');


  const fetchJobs = async () => {
    try {
      const filters = {};
      if (category) filters.category = category;
      if (title) filters.title = title;
      if (remote) filters.remote = remote === 'true';
      const response = await getJobs(filters);
      setJobs(response.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [category, remote]);

  return (
    <div>
      <h1>Job Board</h1>
      <div>
        <label>
          Title:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title filter"
          />
        </label>
        <label>
          Category:
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category filter"
          />
        </label>
        <label>
          Remote:
          <select value={remote} onChange={(e) => setRemote(e.target.value)}>
            <option value="">Any</option>
            <option value="true">Remote</option>
            <option value="false">On-site</option>
          </select>
        </label>
      </div>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>Company: {job.company?.name}</p>
            <p>Salary: {job.salary}</p>
            <p>Remote: {job.remote ? 'Yes' : 'No'}</p>
            <p>Category: {job.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default JobList;