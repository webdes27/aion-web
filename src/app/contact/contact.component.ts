import {Component, Inject}  from '@angular/core';
import {FORM_DIRECTIVES, Control, ControlGroup, FormBuilder, Validators} from '@angular/common';
import {validateEmail} from './../web.util';
import {BaseService} from './../services/base.service';

class User {
    public name: string;
    public email: string;
    public subject: string;
    public body: string;
}

class Result {
    public err_name: string;
    public err_email: string;
    public err_subject: string;
    public err_body: string;
    public message: string;
    public success: boolean;
}

@Component({
  selector: 'contact',
  template: require('./contact.html'),
  providers:[BaseService],
  directives: [FORM_DIRECTIVES],
})
export class ContactComponent {
  contactForm: ControlGroup;
  submitted: Boolean = false;
  model = new User();
  result = new Result();

  constructor (private _formBuilder: FormBuilder, private _baseService: BaseService) {
    this.contactForm = this._formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(45)])],
      email: ["", Validators.compose([Validators.required, validateEmail])],
      subject: ["", Validators.required],
      body: ["", Validators.required]
    });
  }

  onSubmit(credentials) {
   this._baseService.contact(credentials).subscribe((data) => {
     //console.log(data);
     this.result.success = data.success;
     if(!data.success) {
       this.result.err_name = (typeof data.errors.name !== "undefined") ? data.errors.name[0] : '';
       this.result.err_email = (typeof data.errors.email !== "undefined") ?  data.errors.email[0] : '';
       this.result.err_subject  = (typeof data.errors.subject !== "undefined") ? data.errors.subject[0] : '';
       this.result.err_body  = (typeof data.errors.body !== "undefined") ? data.errors.body[0] : '';
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
   });
  }

  clear() {
    for(let c in this.contactForm.controls) {
      (<Control>this.contactForm.controls[c]).updateValue('');
      (<Control>this.contactForm.controls[c]).setErrors(null);
    };
  }

}
