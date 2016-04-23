import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Router} from 'angular2/router';
import {UserService} from './services/user.service';
import {StorageService} from './services/storage.service';

@Component({
  selector: 'login',
  templateUrl: 'app/partials/login.html',
  providers:[FORM_DIRECTIVES, UserService, StorageService]
})
export class LoginComponent {
  loginForm: ControlGroup;

  constructor(private _userService: UserService, private _builder: FormBuilder, private _router: Router) {

    this.loginForm = _builder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._userService.login(credentials).subscribe((result) => {
      if (result) {
        this._router.navigate(['Index']);
      }
    });
  }
}
