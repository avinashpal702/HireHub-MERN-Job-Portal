import { useEffect, useState } from 'react';
import api from '../Services/api';

export default function RecruiterDashboard() {
  const [stats, setStats] = useState({ jobs: 0, applicants: 0, shortlisted: 0, hired: 0 });

  useEffect(() => {
    // You can create a summary endpoint later; placeholder values for now
    // const { data } = await api.get('/recruiter/summary');
    // setStats(data);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Recruiter Dashboard</h1>
      <ul className="space-y-2">
        <li>Total Jobs: {stats.jobs}</li>
        <li>Total Applicants: {stats.applicants}</li>
        <li>Shortlisted: {stats.shortlisted}</li>
        <li>Hired: {stats.hired}</li>
      </ul>
    </div>
  );
}