import {Component, Inject}  from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {validateEmail} from './../services/validate/validate.service';
import {ContactService} from './contact.service'
import {LoadingService} from '../services/loading';
;

class User {
  public name:string;
  public email:string;
  public subject:string;
  public body:string;
}

class Result {
  public err_name:string;
  public err_email:string;
  public err_subject:string;
  public err_body:string;
  public message:string;
  public success:boolean;
}

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  providers: [ContactService],
})
export class ContactComponent {
  contactForm:FormGroup;
  submitted:Boolean = false;
  model = new User();
  result = new Result();
  errorMessage:string;

  constructor(private _formBuilder:FormBuilder, private contactService:ContactService, private loadingService:LoadingService) {
    this.contactForm = this._formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(45)])],
      email: ["", Validators.compose([Validators.required, validateEmail])],
      subject: ["", Validators.required],
      body: ["", Validators.required]
    });
  }

  onSubmit(credentials) {
    this.loadingService.show();
    this.contactService.contact(credentials).then(data => {
      this.loadingService.hide();
      //console.log(data);
      this.result.success = data.success;
      if (!data.success) {
        this.result.err_name = (typeof data.errors.name !== "undefined") ? data.errors.name[0] : '';
        this.result.err_email = (typeof data.errors.email !== "undefined") ? data.errors.email[0] : '';
        this.result.err_subject = (typeof data.errors.subject !== "undefined") ? data.errors.subject[0] : '';
        this.result.err_body = (typeof data.errors.body !== "undefined") ? data.errors.body[0] : '';
      } else {
        this.result.message = data.message;
        this.submitted = true;
        this.clear();
        setTimeout(()=> {
          this.model = new User();
          this.result = new Result();
          this.submitted = false;
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
    for (let c in this.contactForm.controls) {
      (<FormControl>this.contactForm.controls[c]).setValue('');
      (<FormControl>this.contactForm.controls[c]).setErrors(null);
    }
    ;
  }

}
