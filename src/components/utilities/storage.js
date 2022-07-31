export function saveToStorage(key, values) {
  localStorage.setItem(key, JSON.stringify(values));
}

export function getFromStorage(key) {
  const values = localStorage.getItem(key);

  if (!values) {
    return null;
  }

  return JSON.parse(values);
}
