const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// get user by jwt token
const getUserByToken = async (token) => {

  if(!token) return res.status(401).send("Access Denied")

  const decoded = jwt.verify(token, "secret");

  const userId = decoded.id;
  const user = await User.findOne({_id: userId})

  return user;
}


module.exports = getUserByToken;