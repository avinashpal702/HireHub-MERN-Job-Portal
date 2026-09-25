import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="auth-header">
          <span className="eyebrow small">Join us</span>
          <h2>Create your account</h2>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="text-input" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="text-input" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="text-input" />
          <select name="role" value={form.role} onChange={handleChange} className="text-input select-input">
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
          <button type="submit" className="primary-button full-width">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}