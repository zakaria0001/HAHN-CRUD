import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, getCompanies, getJobById, updateJob } from '../services/api';

export default function JobForm() {
  const { id } = useParams(); // if editing
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [companies, setCompanies] = useState([]);  // <-- Add state for companies

  const [form, setForm] = useState({
    title: '',
    category: '',
    salary: '',
    remote: false,
    companyId: '',
    description: '',
  });
  useEffect(() => {
    getCompanies()
      .then(res => setCompanies(res.data))
      .catch(err => console.error('Failed to fetch companies', err));
  }, []);
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

    const apiCall = isEdit ? updateJob(id, payload) : createJob(payload);

    apiCall
      .then(() => navigate('/'))
      .catch(err => console.error('Failed to save job', err));
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 space-y-6"
    >
      <h2 className="text-2xl font-bold">{isEdit ? 'Edit Job' : 'Create New Job'}</h2>

      <label className="block">
        <span className="text-gray-700 font-semibold">Title:</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold">Category:</span>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold">Salary:</span>
        <input
          name="salary"
          type="number"
          value={form.salary}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          name="remote"
          type="checkbox"
          checked={form.remote}
          onChange={handleChange}
          className="h-5 w-5 text-blue-600"
        />
        <span className="text-gray-700 font-semibold">Remote</span>
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold">Company:</span>
        <select
          name="companyId"
          value={form.companyId}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a company</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700 font-semibold">Description:</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {isEdit ? 'Update Job' : 'Create Job'}
      </button>
    </form>
  );
}
