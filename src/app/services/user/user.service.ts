import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from '../storage/storage.service';

@Injectable()
export class UserService {

  _loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public update:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _storage:StorageService) {

    if (!!this._storage.getAuthToken()) {
      this._loggedIn.next(true);
    }
  }

  login(access_token, username) {
    this._storage.setAuthToken(access_token);
    this._storage.setAuthUsername(username);
    this._loggedIn.next(true);
  }

  logout() {
    this._storage.removeAuthToken();
    this._storage.removeAuthUsername();
    this._loggedIn.next(false);
  }

  isLoggedIn() {
    return this._loggedIn.getValue();
  }

  getLoggedIn() {
    return this._loggedIn;
  }

  getUsername() {
    return this._storage.getAuthUsername();
  }

  setUpdateStatus(isUpdate) {
    this.update.next(isUpdate);
  }

}
