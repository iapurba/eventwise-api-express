import constants from "../utils/constants.js";

export const authorizeUser = (req, res, next) => {
    const authenticatedUserId = req.user.userId;
    const requestedUserId = req.params.userId;
    if (authenticatedUserId == requestedUserId) {
        return next();
    }
    return res.status(403).json({ error: constants.AUTH_ACCESS_DENIED });
};