import cv from './converter';

const processUser = user => ({
  id: user.id,
  login: user.login,
  date: user.date,
  isAdmin: cv.strToBool(user.isAdmin),
});

export default processUser;
