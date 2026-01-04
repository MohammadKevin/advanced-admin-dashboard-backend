import AppError from '../utils/appError.js';

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.code === 'P2025') {
        err = new AppError('Data not found', 404);
    }

    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid token. Please login again.', 401);
    }

    if (err.name === 'TokenExpiredError') {
        err = new AppError('Token expired. Please login again.', 401);
    }

    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
        });
    }

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    console.error('ERROR 💥', err);

    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });
};