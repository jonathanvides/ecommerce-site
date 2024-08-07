// Store token in local storage

const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const removeToken = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  export { setToken, getToken, removeToken };