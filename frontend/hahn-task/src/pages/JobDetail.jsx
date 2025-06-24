import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById, updateJob, deleteJob } from '../services/api'; // 👈 add deleteJob here

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState({
    title: '',
    salary: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    getJobById(id)
      .then(res => {
        const data = res.data;
        setJob(data);
        setForm({
          title: data.title,
          salary: data.salary,
          category: data.category,
          description: data.description || '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch job details', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
const handleDelete = async () => {
  if (window.confirm('Are you sure you want to delete this job?')) {
    try {
      await deleteJob(job.id);
      window.location.href = '/'; // or use useNavigate() for better SPA behavior
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};

  const handleUpdate = async () => {
    try {
      const payload = {
        ...job,
        ...form,
        salary: Number(form.salary),
        company: { id: job.company.id }, // Required for backend
      };
      const res = await updateJob(job.id, payload);
      setJob(res.data);
      setEditable(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {editable ? (
        <>
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Edit Job</h2>

          <label className="block mb-2">
            <span className="font-semibold">Title:</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block mb-2">
            <span className="font-semibold">Salary:</span>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block mb-2">
            <span className="font-semibold">Category:</span>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <label className="block mb-4">
            <span className="font-semibold">Description:</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </label>

          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditable(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4 text-blue-800 uppercase">{job.title}</h2>
          <p><strong>Company:</strong> {job.company?.name}</p>
          <p><strong>Category:</strong> {job.category}</p>
          <p><strong>Salary:</strong> ${job.salary.toLocaleString()}</p>
          <p><strong>Remote:</strong> {job.remote ? 'Yes' : 'No'}</p>
                    {job.keywords && (
                    <p className="flex flex-wrap gap-2">
                      <span className="font-semibold w-full">Keywords:</span>
                      {job.keywords.split(',').map((kw, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full"
                        >
                          {kw.trim()}
                        </span>
                      ))}
                    </p>
                  )}          <p className="mt-4"><strong>Description:</strong></p>
          <p className="whitespace-pre-wrap">{job.description || 'No description provided.'}</p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setEditable(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Edit Job
            </button>
              <button
    onClick={handleDelete}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
  >
    Delete Job
  </button>
            <Link
              to="/"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back to Job List
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
