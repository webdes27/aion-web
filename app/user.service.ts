import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import {StorageService} from './storage.service';


@Injectable()
export class UserService {
  _loggedIn = new BehaviorSubject(false);

  constructor(private _http: Http, private _storage: StorageService) {

    if (!!this._storage.getAuthToken()) {
      this._loggedIn.next(true);
    }
  }

  login(credentials) {
    return this._http
      .post('/login', JSON.stringify(credentials), { headers: this._storage.getJsonHeaders() })
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this._storage.setAuthToken(res.auth_token);
          this._loggedIn.next(true);
        }

        return res.success;
      });
  }

  logout() {
    this._storage.removeAuthToken();
    this._loggedIn.next(false);
  }

  isLoggedIn() {
    return this._loggedIn.getValue();
  }

  getLoggedIn() {
    return this._loggedIn;
  }
}
