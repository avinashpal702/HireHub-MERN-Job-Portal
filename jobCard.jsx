import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{job.title}</h3>
      <p className="text-gray-600">
        {job.company} – {job.location}
      </p>
      <p className="text-gray-500">{job.salary || 'Salary not disclosed'}</p>
      <p className="text-sm text-gray-400">{job.jobType}</p>
      <Link to={`/jobs/${job._id}`} className="text-blue-600 mt-2 inline-block">
        View Details →
      </Link>
    </div>
  );
}