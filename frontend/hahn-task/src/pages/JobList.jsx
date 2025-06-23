import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../services/api';
import { FaSearch } from 'react-icons/fa'; // make sure to install react-icons if you haven't
import { formatCreatedAt } from '../utils/formatDateUtil';
const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [remote, setRemote] = useState(true); // default to remote jobs
  const [title, setTitle] = useState('');
  const [error, setError]     = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
// Used only on page load
  const fetchJobsInitial = async () => {
    try {
      const response = await getJobs({});
      setJobs(response.data);
    } catch (err) {
      console.error('Initial load failed:', err);
    }
  };

  // Used when Search button is clicked
  const handleSearchClick = async () => {
    if (!title.trim()) {
      setError('Please enter a job title before searching.');
      return;
    }
    setError('');
    try {
      const filters = { title };
      if (category) filters.category = category;
      if (remote) filters.remote = remote === 'true';

      const response = await getJobs(filters);
      setJobs(response.data);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchJobsInitial();
  }, []);


  return (
    <div className="max-w-4xl  mx-auto p-6 bg-blue-100 rounded-lg shadow-md">
      <section className='flex flex-row items-end mb-8 w-full justify-between'>
        <div className="mt-6 text-center">
        <Link
          to="/jobs/new"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          title='Create a new job'
        >
          + Post a Job
        </Link>
      </div>
      </section>

      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <label className="flex flex-col">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title filter"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
          />
        </label>

        <label className="flex flex-col">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category filter"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
          />
        </label>

        <label className="flex flex-col">
          <select
            value={remote}
            onChange={(e) => setRemote(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
          >
            <option value="true">Remote</option>
            <option value="">Any</option>
            <option value="false">On-site</option>
          </select>
        </label>
      </div>
 {error && (
        <p className="text-center text-red-600 mb-4">
          {error}
        </p>
      )}

     <div className="flex justify-center mb-8 w-full">
  <button
    onClick={handleSearchClick}
    disabled={!title.trim()}
    className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
      !title.trim()
        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
        : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
    }`}
  >
    <FaSearch className="text-white" />
    Search
  </button>
</div>
      <ul className="space-y-6">
        {currentJobs.length === 0 ? (
          <p className="text-center text-gray-600">No jobs available.</p>
        ) : (
          currentJobs.map((job) => (
            <Link to={`/jobs/${job.id}`}>
           <li
                key={job.id}
                className="border border-gray-300 rounded-xl p-5 my-2 shadow-sm hover:shadow-lg transition-shadow bg-white space-y-5"
              >
                <h3 className="text-2xl font-bold mb-1">
                  <Link to={`/jobs/${job.id}`} className="text-blue-700 hover:underline uppercase tracking-wide">
                    {job.title}
                  </Link>
                </h3>

                <div className="text-gray-700 space-y-1">
                  <p><span className="font-semibold">Company:</span> {job.company?.name}</p>
                  
                  <p>
                    <span className="font-semibold">Salary:</span>
                    <span className="inline-block bg-green-100 text-green-700 font-medium ml-2 px-2 py-0.5 rounded">
                      ${job.salary.toLocaleString()}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Remote:</span>
                    {job.remote ? (
                      <span className="inline-block bg-blue-100 text-blue-800 font-medium ml-2 px-2 py-0.5 rounded">
                        Remote
                      </span>
                    ) : (
                      <span className="inline-block bg-yellow-100 text-yellow-800 font-medium ml-2 px-2 py-0.5 rounded">
                        On-site
                      </span>
                    )}
                  </p>

                  <p><span className="font-semibold">Category:</span> {job.category}</p>

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
                  )}
                </div>
                <div className="text-gray-500 text-sm whitespace-nowrap ml-4">
          {formatCreatedAt(job.createdAt)}
        </div>
              </li>
            </Link>
          ))
        )}
      </ul>

        {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}


     
    </div>
  );
};

export default JobList;
