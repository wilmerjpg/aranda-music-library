export const getValueFromLocalStorage = key => {
  let value = localStorage.getItem(key);
  value = value ? JSON.parse(value) : null;
  return value;
};

export const setValueToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

