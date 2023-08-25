export const authorizeUser = (req, res, next) => {
    const user = req.user;
    const authenticatedUserId = user._id.toString();
    const requestedUserId = req.params.userId;
    if (authenticatedUserId == requestedUserId) {
        return next();
    }
    return res.status(403).json({ error: "Access denied" });
};