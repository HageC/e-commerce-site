const errorHandler = (err, req, res, next) => {
  const defaultResponse = {
    message: err.message || "There was an error, try again.",
    statusCode: err.statusCode || 500,
  };

  if (err.name === "ValidationError") {
    defaultResponse.statusCode = 400;
    defaultResponse.message = Object.keys(err.errors)
      .map((error) => error.charAt(0).toUpperCase() + error.slice(1))
      .join(", ");

    defaultResponse.message = `${defaultResponse.message} ${
      defaultResponse.message.split(", ").length > 1 ? "are" : "is"
    } invalid`;
  }

  if (err.code && err.code === 11000) {
    defaultResponse.statusCode = 400;
    defaultResponse.message = `${Object.keys(err.keyValue)}`;
  }

  res
    .status(defaultResponse.statusCode)
    .json({ message: defaultResponse.message });
};

export default errorHandler;
