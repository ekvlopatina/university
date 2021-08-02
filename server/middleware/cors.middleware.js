function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    next();
}

module.exports = cors