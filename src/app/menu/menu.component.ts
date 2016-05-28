import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {UserService} from './../services/user/user.service';
import {Config, APP_CONFIG} from './../app.config';

@Component({
  selector: 'top-menu',
  template: require('./menu.html'),
  directives: [ROUTER_DIRECTIVES],
  //changeDetection: ChangeDetectionStrategy.OnPush
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
