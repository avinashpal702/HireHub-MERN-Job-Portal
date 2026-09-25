import { useEffect, useState } from 'react';
import api from '../Services/api';
import { Link } from 'react-router-dom';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const { data } = await api.get('/jobs?recruiter=true'); // you may filter by recruiter on backend later
    setJobs(data.jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this job?')) return;
    await api.delete(`/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Jobs</h2>
      <ul className="space-y-2">
        {jobs.map(job => (
          <li key={job._id} className="border p-3 flex justify-between items-center">
            <span>
              {job.title} – {job.location}
            </span>
            <div className="space-x-2">
              <Link to={`/jobs/${job._id}`} className="text-blue-600">
                View
              </Link>
              <Link to={`/recruiter/edit-job/${job._id}`} className="text-green-600">
                Edit
              </Link>
              <button onClick={() => handleDelete(job._id)} className="text-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}