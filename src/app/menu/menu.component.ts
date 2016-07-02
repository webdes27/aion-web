import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './../services/user/user.service';
import {Config, APP_CONFIG} from './../app.config';

@Component({
  selector: 'top-menu',
  template: require('./menu.html')
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
    this._router.navigate(['index']);
    return false;
  }

}
