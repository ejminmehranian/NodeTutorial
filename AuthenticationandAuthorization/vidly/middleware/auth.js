const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get the token from the header
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    //try to verify if token is correct given the config private key
    //if not valid throws an exception
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    //what this does is allows req.user to have req.uder._id and etc
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}