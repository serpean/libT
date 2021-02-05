const path = require('path')
const fs = require('fs');

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.status = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    const pathName = path.join(__dirname, "..", "public.pem")
    const secret = pathName !== '/' && fs.existsSync(pathName) ? fs.readFileSync(pathName, 'utf8') : undefined;
    decodedToken = jwt.verify(token, secret, { algorithm: 'RS256' });
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('not authonticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.userToken = token;
  next();
};
