export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status((statusCode) => {
    success: false;
    message: message;
    statck: process.env.NODE_ENV === "production" ? null : err.statck;
  });
};
