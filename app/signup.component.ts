import {Component}  from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {JSONP_PROVIDERS, Http, HTTP_PROVIDERS, Headers, RequestOptions}  from 'angular2/http';
import {validateEmail, urlEncode} from './web.util';

class User {
    public name: string;
    public password: string;
    public password_repeat: string;
    public email: string;
}

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/signup.html',
  providers:[FORM_DIRECTIVES, HTTP_PROVIDERS]
})

export class SignupComponent {
  signupForm: ControlGroup;

  constructor (private _formBuilder: FormBuilder, private http: Http) {
    this.signupForm = this._formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(45)])],
      email: ["", Validators.compose([Validators.required, validateEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      password_repeat: ["", Validators.required]
    });
  }

  signup(credentials) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post('http://host3/site/signupjson', urlEncode(credentials), options)
      .map(res => res.json())
      .map(
        (data) => {
          if (!data.success) {
                // if not successful, bind errors to error variables
                //name.errors = (typeof data.errors.name !== "undefined") ? data.errors.name[0] : '';
                //password.errors = (typeof data.errors.password !== "undefined") ? data.errors.password[0] : '';
                //email.errors = (typeof data.errors.email !== "undefined") ?  data.errors.email[0] : '';
            } else {
                // if successful, bind success message to message
                //$scope.message = data.message;
            }
        console.log(data);
        return data.success;
      });
  }

  active = true;
  model = new User();
  submitted = false;

  onSubmit(credentials) {
    this.signup(credentials).subscribe((result) => {
      if (result) {
        //this._router.navigate(['List']);
      }
    });
    // this.submitted = true;
    // this.model = new User();
    // this.active = false;
    // setTimeout(()=> this.active=true, 0);
  }

}