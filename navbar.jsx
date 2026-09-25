import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand-mark">
          <span className="brand-dot">H</span>
          <span>HireHub</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Jobs
          </NavLink>
          {user ? (
            <>
              {user.role === 'candidate' && (
                <>
                  <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Profile
                  </NavLink>
                  <NavLink to="/applications" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    My Applications
                  </NavLink>
                </>
              )}
              {user.role === 'recruiter' && (
                <>
                  <NavLink to="/recruiter/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/recruiter/create-job" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Post Job
                  </NavLink>
                </>
              )}
              {user.role === 'admin' && (
                <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Admin
                </NavLink>
              )}
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;