import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-circle">{user.name?.charAt(0)?.toUpperCase() || 'U'}</div>
          <div>
            <span className="eyebrow small">Profile</span>
            <h1>{user.name}</h1>
          </div>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>
          <div className="info-row">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}