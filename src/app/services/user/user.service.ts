import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StorageService} from '../storage/storage.service';

@Injectable()
export class UserService {
  _loggedIn = new BehaviorSubject(false);

  constructor(private _storage: StorageService) {

    if (!!this._storage.getAuthToken()) {
      this._loggedIn.next(true);
    }
  }

  login(access_token) {
    this._storage.setAuthToken(access_token);
    this._loggedIn.next(true);
  }

  logout() {
    this._storage.removeAuthToken();
    this._loggedIn.next(false);
  }

  isLoggedIn() {
    return this._loggedIn.getValue();
  }

  getLoggedIn() {
/*    if (!!this._storage.getAuthToken()) {
      this._loggedIn.next(true);
    }*/
    return this._loggedIn;
  }
}
