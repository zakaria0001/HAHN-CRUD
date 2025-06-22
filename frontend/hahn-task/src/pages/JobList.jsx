import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../services/api';

const JobList = () => {
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
  }, [category, remote, title]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-blue-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Job Board</h1>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-700">Title:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title filter"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-700">Category:</span>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category filter"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-gray-700">Remote:</span>
          <select
            value={remote}
        onChange={(e) => setRemote(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="true">Remote</option>
            <option value="false">On-site</option>
          </select>
        </label>
      </div>

      <ul className="space-y-6">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="border border-gray-300 rounded p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">
              <Link
                to={`/jobs/${job.id}`}
                className="text-blue-600 hover:underline"
              >
                {job.title}
              </Link>
            </h3>
            <p><span className="font-semibold">Company:</span> {job.company?.name}</p>
            <p><span className="font-semibold">Salary:</span> ${job.salary.toLocaleString()}</p>
            <p><span className="font-semibold">Remote:</span> {job.remote ? 'Yes' : 'No'}</p>
            <p><span className="font-semibold">Category:</span> {job.category}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <Link
          to="/jobs/new"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Job
        </Link>
      </div>
    </div>
  );
};

export default JobList;
