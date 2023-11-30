//TODO  - Middleware file for future rules and role regulations for coaches and super users.

const jwt = require("jsonwebtoken");

function checkJWTToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is sent in the 'Authorization' header as 'Bearer <token>'

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
      if (error) {
        return res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decoded; // Add the decoded token to the request object
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token provided" });
  }
}

module.exports = {
  checkJWTToken,
  // ... other middlewares
};
