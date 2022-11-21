const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {

  const token = req.cookies['x-access-token'];
  
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return res.status(401).end();

    req.user = decoded.username;
    next();
  })
};

module.exports = verifyJWT