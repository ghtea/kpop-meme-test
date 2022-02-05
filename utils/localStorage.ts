export const setLocalStorage = (key:string, value: any) => {
  if(!localStorage) return;
  localStorage[key] = (typeof value) === "string" ? value : JSON.stringify(value);
}

export const getLocalStorage = (key:string) => {
  if(!localStorage) return null;

  if(!localStorage[key]) {
    return null;
  }

  try {
    const parsed = JSON.parse(localStorage[key]);
    return parsed;
  } catch(e) {
    return localStorage[key];
  }
}

export const removeLocalStorage = (key:string) => {
  if(!localStorage) return null;

  if(localStorage[key]) {
    localStorage.removeItem(key);
  }
}