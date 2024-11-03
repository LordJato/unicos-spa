export function getToken() {
    return window?.localStorage?.getItem('accessToken');
  }
  
  export function setToken(token) {
    window?.localStorage?.setItem('accessToken', token);
  }
  
  export function removeToken() {
    window?.localStorage?.removeItem('accessToken');
  }