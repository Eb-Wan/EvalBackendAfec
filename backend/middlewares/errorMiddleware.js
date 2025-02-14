const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.clientVisible ? err.message : "Something went wrong";
    console.log(err);
    res.status(500).json({ success: false, message })
};

module.exports = errorMiddleware;