import {Component}  from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {JSONP_PROVIDERS, Http, HTTP_PROVIDERS, Headers, RequestOptions}  from 'angular2/http';
import {validateEmail} from './web.util';

class User {
    public name: string;
    public password: string;
    public passwordConfirmation: string;
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
      passwordRetry: this._formBuilder.group({
        password: ["", Validators.required],
        passwordConfirmation: ["", Validators.required]
      })
    });
  }

  signup(credentials) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post('http://host3/client/index.php/site/signupjson', JSON.stringify(credentials), options)
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
        	console.log('success');
        }
        console.log(res);
        return res.success;
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