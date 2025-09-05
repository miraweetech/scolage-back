export const errorHandler = (err, req, res, next) => {
    console.error("error handler middleware");
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";

    res.status(statusCode).send(errorMessage);
};
