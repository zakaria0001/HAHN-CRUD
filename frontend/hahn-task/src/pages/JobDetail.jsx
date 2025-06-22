import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/api';

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobById(id)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch job details', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-800">{job.title}</h2>
      <p><strong>Company:</strong> {job.company?.name}</p>
      <p><strong>Category:</strong> {job.category}</p>
      <p><strong>Salary:</strong> ${job.salary.toLocaleString()}</p>
      <p><strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}</p>
      <p className="mt-4"><strong>Description:</strong></p>
      <p className="whitespace-pre-wrap">{job.description || 'No description provided.'}</p>

      <div className="mt-6 flex gap-4">
        <Link
          to={`/jobs/${job.id}/edit`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Edit Job
        </Link>
        <Link
          to="/"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Back to Job List
        </Link>
      </div>
    </div>
  );
}
