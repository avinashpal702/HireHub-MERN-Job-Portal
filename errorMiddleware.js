// middleware/errorMiddleware.js
// Simple wrapper to catch async errors
exports.asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};