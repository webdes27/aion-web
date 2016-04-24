import {Component, Inject, ChangeDetectionStrategy} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {UserService} from './services/user.service';
import {Config, APP_CONFIG} from './app.config';

@Component({
  selector: 'top-menu',
  templateUrl: 'app/partials/menu.html',
  directives: [ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  pipes: []
})
export class MenuComponent {

  constructor(private _userService: UserService, private _router:Router, @Inject(APP_CONFIG) private _config: Config) {}

  title = this._config.title;

  getLoggedIn() {
    return this._userService.getLoggedIn();
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['Index']);
    return false;
  }

}
