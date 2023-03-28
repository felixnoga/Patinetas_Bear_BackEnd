const jwt = require('jsonwebtoken');
require('dotenv').config();

const secrets = JSON.parse(process.env.DB);

const validateToken = (req, res, next) => {
  const token = req.query.token;

  console.log(token);

  if (!token) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  try {
    const userVerified = jwt.verify(token, secrets.jwtsecret);
    req.user = userVerified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'invalid token' });
  }
};
module.exports = validateToken;
