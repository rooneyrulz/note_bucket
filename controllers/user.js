export const getUsers = (req, res, next) => res.status(200).send('Get users..');

export const getUser = (req, res, next) => res.status(200).send('Get user..');

export const addUser = (req, res, next) => res.status(200).send('Add users..');

export const deleteUser = (req, res, next) =>
  res.status(200).send('Del user..');
