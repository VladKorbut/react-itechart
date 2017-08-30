import cv from './converter';

const processUsers = (users) => {
  const usersArray = [...users];
  return usersArray.map(item => ({
    id: item.id,
    login: item.login,
    date: item.date,
    isAdmin: cv.strToBool(item.isAdmin),
  }));
};

export default processUsers;
