import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './../services/user/user.service';

@Component({
  selector: 'user-menu',
  templateUrl: './usermenu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsermenuComponent {

  constructor(private userService:UserService, private router:Router) {
  }

  getLoggedIn() {
    return this.userService.getLoggedIn();
  }

}
