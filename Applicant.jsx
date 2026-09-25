import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Services/api';

export default function Applicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get(`/applications/job/${jobId}`);
      setApplicants(data);
    };
    fetch();
  }, [jobId]);

  const updateStatus = async (appId, status) => {
    await api.patch(`/applications/${appId}/status`, { status });
    // Refresh list
    const { data } = await api.get(`/applications/job/${jobId}`);
    setApplicants(data);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Applicants for Job {jobId}</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Candidate</th>
            <th className="p-2">Resume</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(app => (
            <tr key={app._id} className="border-t">
              <td className="p-2">{app.candidate?.name || '—'}</td>
              <td className="p-2">
                {app.resume ? (
                  <a href={app.resume} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : (
                  '—'
                )}
              </td>
              <td className="p-2">{app.status}</td>
              <td className="p-2 space-x-2">
                <select defaultValue={app.status} onChange={e => updateStatus(app._id, e.target.value)}>
                  {['Applied', 'Shortlisted', 'Interview', 'Hired', 'Rejected'].map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}