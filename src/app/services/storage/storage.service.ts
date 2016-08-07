
const STORAGE_KEY = 'auth_token';
const STORAGE_KEY_USER_NAME = 'username';

export class StorageService {
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setAuthToken(token) {
    localStorage.setItem(STORAGE_KEY, token);
  }

  removeAuthToken() {
    localStorage.removeItem(STORAGE_KEY);
  }

  getAuthUsername() {
  	return localStorage.getItem(STORAGE_KEY_USER_NAME);
  }

  setAuthUsername(username) {
    localStorage.setItem(STORAGE_KEY_USER_NAME, username);
  }

  removeAuthUsername() {
    localStorage.removeItem(STORAGE_KEY_USER_NAME);
  }

}
