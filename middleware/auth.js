import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.header('X-Auth-Token');

  if (!token) return res.status(401).send('Access denied, No token provided!');

  try {
    const decoded = verify(token, process.env.JWT_KEY);

    if (!decoded)
      return res.status(401).send('Access denied, Invalid token provided!');

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Access denied, Invalid signature!');
  }
};
