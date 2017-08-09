import cv from './converter'

const processUsers = (users) => {
  users = [...users];
  return users.map(function (item) {
    return {
      id: item.id,
      login: item.login,
      date: item.date,
      isAdmin: cv.strToBool(item.isAdmin),
    };
  });
}

export default processUsers