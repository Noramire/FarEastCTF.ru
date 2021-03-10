import 'whatwg-fetch';

const AuthProvider = {
  // called when the user attempts to log in
  login: ({ username, password }) => (
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((user) => {
      const jsonUser = JSON.stringify(user);
      window.localStorage.setItem('user', jsonUser);
    })
  ),
  // called when the user clicks on the logout button
  logout: () => (
    fetch('/logout', { method: 'GET' }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      window.localStorage.removeItem('user');
    })
  ),
  getIdentity: () => {
    try {
      const { id, username: fullName } = JSON.parse(window.localStorage.getItem('user'));
      return Promise.resolve({ id, fullName });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => (
    window.localStorage.getItem('user')
      ? Promise.resolve()
      : Promise.reject()),
  // authorization
  getPermissions: () => (
    window.localStorage.getItem('user')
      ? Promise.resolve()
      : Promise.reject()),
  checkError: ({ status }) => {
    if (status == 401 || status == 403) {
      window.localStorage.removeItem('user');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
};

export default AuthProvider;
