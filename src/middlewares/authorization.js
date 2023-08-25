export const authorizeUser = (req, res, next) => {
    const authenticatedUserId = req.user._id.toString();
    const requestedUserId = req.params.userId;

    if (authenticatedUserId !== requestedUserId) {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};