import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

const STORAGE_KEY = 'auth_token';

@Injectable()
export class StorageService {

  constructor() {}

  getAuthToken() {
    return localStorage.getItem(STORAGE_KEY);
  }

  setAuthToken(token) {
    localStorage.setItem(STORAGE_KEY, token);
  }

  removeAuthToken() {
    localStorage.removeItem(STORAGE_KEY);
  }

  getAuthHeaders() {
    let headers = this.getJsonHeaders();
    let authToken = this.getAuthToken();

    headers.append('Authorization', `Bearer ${authToken}`);
    return headers;
  }

  getJsonHeaders() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
