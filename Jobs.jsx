import { useEffect, useState } from 'react';
import api from '../Services/api';
import JobCard from '../components/jobCard';
import SearchBar from '../components/searchBar';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchJobs = async (params = {}) => {
    const qp = new URLSearchParams({ page, limit, ...params }).toString();
    const { data } = await api.get(`/jobs?${qp}`);
    setJobs(data.jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <div>
      <h1 className="text-3xl mb-4">Jobs</h1>
      <SearchBar />
      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
      {/* Simple pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded">
          ← Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">
          Next →
        </button>
      </div>
    </div>
  );
}