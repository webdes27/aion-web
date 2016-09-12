import {Component, Inject, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './../services/user/user.service';
import {Config, APP_CONFIG} from './../app.config';

@Component({
  selector: 'top-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  constructor(private userService:UserService, private router:Router, @Inject(APP_CONFIG) private config:Config) {
  }

  title = this.config.title;

  getLoggedIn() {
    return this.userService.getLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
    return false;
  }

  getUserName() {
    return this.userService.getUsername();
  }

  isAdmin() {
    return this.userService.getLoggedIn() && this.userService.getUsername() == 'admin';
  }

}
