export const authenticateUser = (req, res, next) =>
  res.status(200).send('Authenticate user..');

export const getAuthUser = (req, res, next) =>
  res.status(200).send('Get auth user..');
