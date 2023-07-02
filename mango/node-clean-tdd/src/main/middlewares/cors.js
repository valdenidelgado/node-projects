module.exports = (req, res, next) => {
    res.set('access-control-allow-origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}