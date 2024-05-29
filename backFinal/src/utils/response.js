export const response = (res, statusCode, payload, success = true) => {
    res.status(statusCode).json({
        success,
        error: !success,
        payload
    });
};