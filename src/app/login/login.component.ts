import {Component} from '@angular/core';
import {FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {Router} from '@angular/router-deprecated';
import {UserService} from './../services/user/user.service';
import {StorageService} from './../services/storage/storage.service';

@Component({
  selector: 'login',
  template: require('./login.html'),
  providers:[UserService, StorageService],
  directives: [FORM_DIRECTIVES],
})
export class LoginComponent {
  loginForm: ControlGroup;

  constructor(private _userService: UserService, private _builder: FormBuilder, private _router: Router) {

    this.loginForm = _builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._userService.login(credentials).subscribe((result) => {
      if (result.access_token) {
        this._router.navigate(['Index']);
      } else {
        console.log(result);
      }
    });
  }
}
