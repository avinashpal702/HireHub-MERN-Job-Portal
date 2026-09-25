import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow small">Welcome back</span>
          <h2>Login to HireHub</h2>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="text-input" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="text-input" />
          <button type="submit" className="primary-button full-width">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}