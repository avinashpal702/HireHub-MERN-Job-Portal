import { useEffect, useState } from 'react';
import api from '../Services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, candidates: 0, recruiters: 0, jobs: 0, applications: 0 });

  useEffect(() => {
    // Placeholder: you would create a /admin/summary endpoint
    // const { data } = await api.get('/admin/summary');
    // setStats(data);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li>Total Users: {stats.users}</li>
        <li>Total Candidates: {stats.candidates}</li>
        <li>Total Recruiters: {stats.recruiters}</li>
        <li>Total Jobs: {stats.jobs}</li>
        <li>Total Applications: {stats.applications}</li>
      </ul>
      {/* Add management tables / charts later */}
    </div>
  );
}