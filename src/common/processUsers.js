import cv from './converter'
import dc from './dateConverter'

const processUsers = (users) => {
  users = [...users];
  let processedUsers = [];
  users.forEach(function (item) {
    let newItem = {
      id: item.id,
      login: item.login,
      date: dc.getDDMMYYYY(new Date(item.date)),
      isAdmin: cv.strToBool(item.isAdmin) ? 'Admin' : 'User',
    };
    processedUsers.push(newItem);
  });
  return processedUsers;
}

export default processUsers