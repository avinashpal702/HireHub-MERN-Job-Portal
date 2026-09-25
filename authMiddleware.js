// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Protect routes – attach user object to req if JWT valid
exports.protect = (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Role‑based access
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};