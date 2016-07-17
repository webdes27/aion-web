import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from './../services/user/user.service';
import {StorageService} from './../services/storage/storage.service';

@Component({
  selector: 'login',
  template: require('./login.html'),
  providers:[UserService, StorageService],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _userService: UserService, private _builder: FormBuilder, private _router: Router) {

    this.loginForm = _builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._userService.login(credentials).subscribe((result) => {
      if (!!result['access_token']) {
        this._router.navigate(['index']);
      } else {
        console.log(result);
      }
    });
  }
}
