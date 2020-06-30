export const getIds = (objectsList = []) => {
  return getValues(objectsList, 'id');
};

export const getValues = (objectsList = [], key = '') => {
  return objectsList.map((obj) => obj[key]).flat();
};

export const deleteKeys = (objectsList = [], keys = []) => {
  return objectsList.map((obj) => {
    keys.forEach((key) => delete obj[key]);
    return obj;
  });
};

export const buildObjectOfItems = (objectsList = []) => {
  const objectOfItems = {};

  for (let obj of objectsList) {
    objectOfItems[obj.id] = obj;
  }
  return objectOfItems;
};

export const unique = (listOfItems) => {
  return Array.from(new Set(listOfItems));
};
