import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company?.name}</p>
      <p><strong>Category:</strong> {job.category}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}</p>
      <p><strong>Description:</strong></p>
      <p>{job.description || 'No description provided.'}</p>

      {/* Add Apply button or link here if you want */}
    </div>
  );
}
