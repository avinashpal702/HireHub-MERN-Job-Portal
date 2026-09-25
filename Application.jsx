import { useEffect, useState } from 'react';
import api from '../Services/api';

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get('/applications?candidate=true'); // you may create a route later
      setApps(data);
    };
    fetch();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Job</th>
            <th className="p-2">Status</th>
            <th className="p-2">Applied On</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app._id} className="border-t">
              <td className="p-2">{app.job?.title || app.jobId}</td>
              <td className="p-2">{app.status}</td>
              <td className="p-2">{new Date(app.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}