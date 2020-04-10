const isStorageAvaiable = () => typeof Storage !== "undefined";

const setLocalStorageItem = (name, value) => {
  if (isStorageAvaiable()) {
    localStorage.setItem(name, JSON.stringify(value));
  } else {
    console.error("No Web storage support");
  }
};

const getLocalStorageItem = (name) => {
  if (isStorageAvaiable()) {
    return JSON.parse(localStorage.getItem(name));
  } else {
    console.error("No Web storage support");
  }
  return null;
};

const removeLocalStorageItem = (name) => {
  if (isStorageAvaiable()) {
    localStorage.removeItem(name);
  } else {
    console.error("No Web storage support");
  }
};

const clearLocalStorageItem = () => {
  if (isStorageAvaiable()) {
    localStorage.clear();
  } else {
    console.error("No Web storage support");
  }
};

export {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  clearLocalStorageItem,
  isStorageAvaiable,
};
