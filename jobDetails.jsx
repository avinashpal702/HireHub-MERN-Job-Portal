import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Services/api';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleApply = () => {
    // redirect to a protected apply page (to be implemented)
    navigate(`/jobs/${id}/apply`);
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-1">{job.company}</p>
      <p className="text-gray-500 mb-1">📍 {job.location}</p>
      <p className="text-gray-500 mb-1">💰 {job.salary}</p>
      <p className="text-gray-500 mb-4">🕒 {job.jobType}</p>

      <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
      <p className="whitespace-pre-line mb-4">{job.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Required Skills</h2>
      <ul className="list-disc list-inside mb-4">
        {job.skills?.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <button onClick={handleApply} className="bg-green-600 text-white px-4 py-2 rounded">
        Apply Now
      </button>
    </div>
  );
}