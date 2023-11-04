import jwt from 'jsonwebtoken'
export function authenticateToken(req, res, next) {
  // Retrieve the token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If there is no token, return an error
  if (token == null) return res.sendStatus(401);

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    // If the token is valid, attach the user to the request and proceed
    req.user = user;
    next();
  });
}
