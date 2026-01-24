const errorMiddleware = (err, req, res, next) => {
  res.status(400).json({
    sucess: false,
    message: err.message,
  });
};

export default errorMiddleware;
