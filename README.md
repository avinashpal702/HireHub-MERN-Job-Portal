HireHub — MERN Job Portal

HireHub is a full-stack Job Portal Web Application built using the MERN stack. It allows candidates to search and apply for jobs, while recruiters can post jobs and manage applications.

# Features
User Registration & Login
JWT Authentication
Role-based access — Candidate, Recruiter & Admin
Job Search & Filtering
Job Posting & Management
Job Applications
Resume Upload
Application Status Management
Pagination
Protected Routes
# Tech Stack

Frontend

React.js
React Router
Axios
Vite

Backend

Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
Multer
# Project Structure
HireHub/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── Frontend/
    └── src/
        ├── components/
        ├── Pages/
        ├── Services/
        └── context/
# Installation
Backend
cd Backend
npm install
npm run dev

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Frontend
cd Frontend
npm install
npm run dev

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

# Author
# Avinash Pal