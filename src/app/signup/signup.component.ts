import {Component, Inject}  from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {validateEmail} from './../services/validate/validate.service';
import {SignupService} from './signup.service';
import { LoadingIndicator, LoadingService } from '../services/loading';

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
  template: require('./signup.html'),
  providers: [SignupService],
  directives: [LoadingIndicator],
})

export class SignupComponent {
  signupForm: FormGroup;
  submitted: Boolean = false;
  model = new User();
  result = new Result();
  errorMessage: string;

  constructor (private _formBuilder: FormBuilder, private signupService: SignupService, private loadingService:LoadingService) {
    this.signupForm = this._formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(45)])],
      email: ["", Validators.compose([Validators.required, validateEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])],
      password_repeat: ["", Validators.required]
    });
  }

  onSubmit(credentials) {
    this.loadingService.show();
    this.signupService.signup(credentials).then(data => {
          this.loadingService.hide();
       		//console.log(data);
       		this.result.success = data.success;
       		if(!data.success) {
		    	this.result.err_name = (typeof data.errors.name !== "undefined") ? data.errors.name[0] : '';
		    	this.result.err_password  = (typeof data.errors.password !== "undefined") ? data.errors.password[0] : '';
		    	this.result.err_email = (typeof data.errors.email !== "undefined") ?  data.errors.email[0] : '';
    			} else {
    		    	this.result.message = data.message;
              this.submitted = true;
              this.clear();
               setTimeout(()=> {
                this.model = new User();
                this.result = new Result();
                 this.submitted=false;
                  //this._router.navigate(['Index']);
               }, 7000);
    			}
      })
      .catch(error => {
        this.loadingService.hide();
        this.errorMessage = error;
      });
  }

  clear() {
  	for(let c in this.signupForm.controls) {
  		(<FormControl>this.signupForm.controls[c]).updateValue('');
    	(<FormControl>this.signupForm.controls[c]).setErrors(null);
  	};
  }

}
