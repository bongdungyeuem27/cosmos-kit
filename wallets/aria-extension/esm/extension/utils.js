import { ClientNotExistError } from '@bongdungyeuem27-kit/core';
export const getAriaFromExtension = async () => {
  if (typeof window === 'undefined') {
    return void 0;
  }
  const aria = window.aria;
  if (aria) {
    return aria;
  }
  if (document.readyState === 'complete') {
    if (aria) {
      return aria;
    } else {
      throw ClientNotExistError;
    }
  }
  return new Promise((resolve, reject) => {
    const documentStateChange = (event) => {
      if (event.target && event.target.readyState === 'complete') {
        if (aria) {
          resolve(aria);
        } else {
          reject(ClientNotExistError.message);
        }
        document.removeEventListener('readystatechange', documentStateChange);
      }
    };
    document.addEventListener('readystatechange', documentStateChange);
  });
};
