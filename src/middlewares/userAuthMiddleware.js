import constants from "../utils/constants.js";

export const authorizeUser = (req, res, next) => {
    if (req.user.userId === req.params.userId) {
        return next();
    }
    return res.status(403).json({
        error: {
            message: constants.AUTH_ACCESS_DENIED,
            details: constants.STATUS_FORBIDDEN_DETAILS,
        }
    });
};