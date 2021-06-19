module.exports = (err, req, res, next) => {
    req.xhr ? res.status(500).send({ error: 'Something failed!' }) : next(err);
};
