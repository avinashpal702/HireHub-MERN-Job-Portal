import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './Pages/Home';
import Jobs from './Pages/Jobs';
import JobDetails from './Pages/jobDetails';
import Register from './Pages/Register';
import Login from './Pages/login';
import Profile from './Pages/profile';
import Applications from './Pages/Application';
import RecruiterDashboard from './Pages/RecruiterDashboard';
import CreateJob from './Pages/CreateJob';
import ManageJobs from './Pages/ManageJobs';
import Applicants from './Pages/Applicant';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './components/Protectedroute';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/applications" element={<Applications />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/create-job" element={<CreateJob />} />
            <Route path="/recruiter/manage-jobs" element={<ManageJobs />} />
            <Route path="/recruiter/applicants/:jobId" element={<Applicants />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;