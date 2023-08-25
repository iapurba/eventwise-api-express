export const authorizeUser = (req, res, next) => {
    if (!req.user) {
        return res.status(404).json({ error: "User Not Found" });
    }
    const authenticatedUserId = req.user._id.toString();
    const requestedUserId = req.params.userId;

    if (authenticatedUserId !== requestedUserId) {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};