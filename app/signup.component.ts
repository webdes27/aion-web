import {Component, Inject}  from 'angular2/core';
import {FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {Http, RequestOptions}  from 'angular2/http';
import {validateEmail, urlEncode, getUrlencodedHeaders} from './web.util';
import {Config, APP_CONFIG} from './app.config';

class User {
    public name: string;
    public password: string;
    public password_repeat: string;
    public email: string;
}

class Result {
    public err_name: string;
    public err_password: string;
    public err_email: string;
    public message: string;
    public success: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: 'app/partials/signup.html',
  directives: [FORM_DIRECTIVES],
})

export class SignupComponent {
  signupForm: ControlGroup;
  submitted: Boolean = false;
  model = new User();
  result = new Result();

  constructor (private _formBuilder: FormBuilder, private _http: Http, @Inject(APP_CONFIG) private _config: Config) {
    this.signupForm = this._formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(45)])],
      email: ["", Validators.compose([Validators.required, validateEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      password_repeat: ["", Validators.required]
    });
  }

  signup(credentials) {
    let options = new RequestOptions({ headers: getUrlencodedHeaders() });
    return this._http
      .post(this._config.apiSignup, urlEncode(credentials), options)
      .map(res => res.json())
      .map((data) => {
       		//console.log(data);
       		this.result.success = data.success;
       		if(!data.success) {
		    	this.result.err_name = (typeof data.errors.name !== "undefined") ? data.errors.name[0] : '';
		    	this.result.err_password  = (typeof data.errors.password !== "undefined") ? data.errors.password[0] : '';
		    	this.result.err_email = (typeof data.errors.email !== "undefined") ?  data.errors.email[0] : '';
			} else {
		    	this.result.message = data.message;
			}
	        return this.result.success;
      });
  }

  onSubmit(credentials) {
    this.signup(credentials).subscribe((res) => {
      if (res) {
    	this.submitted = true;
    	this.clear();
     	setTimeout(()=> {
    		this.model = new User();
    		this.result = new Result();
     		this.submitted=false;
        	//this._router.navigate(['Index']);
     	}, 7000);
      }
    });
  }

  clear() {
  	for(let c in this.signupForm.controls) {
  		(<Control>this.signupForm.controls[c]).updateValue('');
    	(<Control>this.signupForm.controls[c]).setErrors(null);
  	};
  }

}