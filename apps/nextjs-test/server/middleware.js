/**
 * https://morioh.com/a/877c7f88024e/how-does-nodejs-middleware-work
 */

/*
app.use(middlewareA);
app.use(middlewareB);
app.get('/test', middlewareC, handler);
app.get('/', [middlewareD, middlewareE], handler);
*/
const jwt = require('jsonwebtoken');

module.exports.userMiddleware = async function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers['authorization'];
  if (token) {
    try {
      // verifies secret
      req.decoded = await jwt.verify(token, config.secret);

      const checkUser = await authenticateTokenHelper.getUserDetail(req);

      // if everything is good, save to request for use in other routes
      if (checkUser) {
        req.user = req.decoded;
        next();
      } else {
        return res.status(403).json({
          message: responseMessage.noAuthorized,
        });
      }
    } catch (err) {
      return res.status(401).json({ message: responseMessage.invalidToken });
    }
  } else {
    // if there is no token
    return res.status(400).json({ message: responseMessage.invalidRequest });
  }
};

exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.username;
    next();
  });
};
