import {Component} from '@angular/core';
import {FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {Router} from '@angular/router-deprecated';
import {UserService} from './services/user.service';
import {StorageService} from './services/storage.service';

@Component({
  selector: 'login',
  templateUrl: 'app/partials/login.html',
  providers:[UserService, StorageService],
  directives: [FORM_DIRECTIVES],
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
