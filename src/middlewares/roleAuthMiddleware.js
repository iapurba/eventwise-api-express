import constants from '../utils/constants.js';

export const restrictRoleUpdate = (req, res, next) => {
    if (req.body.role && req.user.role != 'admin') {
        return res.status(403).json({ message: 'Access denied, Role update not allowed' });
    }
    next();
};

export const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({
                error: {
                    message: constants.AUTH_ACCESS_DENIED,
                    details: constants.STATUS_FORBIDDEN_DETAILS,
                }
            });
        }
    };
};