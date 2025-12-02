module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    res.status(401).send('Unauthorized');
};
