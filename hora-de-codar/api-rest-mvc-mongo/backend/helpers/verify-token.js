const jwt = require("jsonwebtoken");
const getToken = require("./get-token");

const verifyToken = (req, res, next) => {

  if(!req.headers.authorization) return res.status(401).send("Access Denied")

  const token = getToken(req); 
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

module.exports = verifyToken;