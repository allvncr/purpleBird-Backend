const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err.message) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: err.message });
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again" });
  }
};

module.exports = errorHandlerMiddleware;
