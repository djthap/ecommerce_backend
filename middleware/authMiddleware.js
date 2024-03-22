const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {

  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'this-is-our-web-app');
    req.user = decoded.user;
    console.log(decoded.user)
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = isAuthenticated;

