const errorHandling = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.status || 500;
    return res.status(statusCode).json({ error: statusCode === 500 ? 'Internal server error' : err.message });
};

module.exports = errorHandling;