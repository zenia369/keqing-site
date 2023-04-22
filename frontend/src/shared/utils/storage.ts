export const getLSItem = (key: string) =>
  JSON.parse(localStorage.getItem(key) as any)

export const setLSItem = (key: string, data: any) =>
  localStorage.setItem(key, JSON.stringify(data))

export const removeLSItem = (key: string) => localStorage.removeItem(key)
