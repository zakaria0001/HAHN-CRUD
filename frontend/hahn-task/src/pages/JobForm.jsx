import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, getJobById, updateJob } from '../services/api';

export default function JobForm() {
  const { id } = useParams();       // if editing
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    category: '',
    salary: '',
    remote: false,
    companyId: '',    // or company name, depending on your backend
    description: '',
  });

  useEffect(() => {
    if (isEdit) {
      getJobById(id)
        .then(res => {
          const job = res.data;
          setForm({
            title: job.title || '',
            category: job.category || '',
            salary: job.salary || '',
            remote: job.remote || false,
            companyId: job.company?.id || '',
            description: job.description || '',
          });
        })
        .catch(err => console.error('Failed to load job for edit', err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    salary: Number(form.salary),
    company: { id: Number(form.companyId) },
  };
  delete payload.companyId;

  console.log('Payload to send:', payload);  // <-- Add this line

  const apiCall = isEdit ? updateJob(id, payload) : createJob(payload);

  apiCall
    .then(() => navigate('/'))
    .catch(err => console.error('Failed to save job', err));
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit Job' : 'Create New Job'}</h2>

      <label>
        Title:
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Category:
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Salary:
        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          type="number"
        />
      </label>

      <label>
        Remote:
        <input
          name="remote"
          type="checkbox"
          checked={form.remote}
          onChange={handleChange}
        />
      </label>

      <label>
        Company ID:
        <input
          name="companyId"
          value={form.companyId}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
    </form>
  );
}
