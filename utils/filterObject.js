module.exports = (object, ...whiteList) => {
  const newObj = {};
  whiteList.forEach(field => {
    newObj[field] = object[field];
  });
  return newObj;
};
