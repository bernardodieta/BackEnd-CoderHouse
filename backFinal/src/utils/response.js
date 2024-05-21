export const response = (res, statusCode, payload) => {
    res.status(statusCode).json({
        success: true,
        error: false,
        payload
    });
 
}

