const pageNotFound = (req, res, next) => {
  res.status(404).json({
    sucess: false,
    message: "Page not found",
  });
};

export default pageNotFound;
