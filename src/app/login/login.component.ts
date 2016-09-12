import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [LoginService],
})
export class LoginComponent {
  loginForm:FormGroup;
  errorMessage:string;

  constructor(private _loginService:LoginService, private _builder:FormBuilder, private _router:Router, private _userService:UserService) {

    this.loginForm = _builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._loginService.login(credentials).then(data => {
      if (!!data['access_token']) {
        this._userService.login(data['access_token'], data['username']);
        this._router.navigate(['index']);
      } else {
        this.errorMessage = JSON.stringify(data);
      }
    })
      .catch(error => {
        this.errorMessage = JSON.stringify(error);
        console.log(error);
      });

  }

}
