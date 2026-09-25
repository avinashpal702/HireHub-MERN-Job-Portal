import { useState } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

export default function CreateJob() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    jobType: '',
    experience: '',
    skills: '',
    category: '',
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()) };
    try {
      await api.post('/jobs', payload);
      navigate('/recruiter/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="jobType" value={form.jobType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Job Type</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>
        <input name="experience" placeholder="Experience (e.g. 2 years)" value={form.experience} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} rows={5} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Publish Job
        </button>
      </form>
    </div>
  );
}