export const getLSItem = (key) => JSON.parse(localStorage.getItem(key))

export const setLSItem = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data))

export const removeLSItem = (key) => localStorage.removeItem(key)
