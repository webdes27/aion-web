import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StorageService} from './storage.service';
import {Config, APP_CONFIG} from '../app.config';

@Injectable()
export class UserService {
  _loggedIn = new BehaviorSubject(false);

  constructor(private _http: Http, private _storage: StorageService, @Inject(APP_CONFIG) private _config: Config) {

    if (!!this._storage.getAuthToken()) {
      this._loggedIn.next(true);
    }
  }

  login(credentials) {
    return this._http
      .post(this._config.apiLogin, JSON.stringify(credentials), { headers: this._storage.getJsonHeaders() })
      .map(res => res.json())
      .map((res) => {
        console.log(res);
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
