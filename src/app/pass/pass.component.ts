import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PassService} from './pass.service';
import {UserService} from '../services/user/user.service';
import {LoadingService} from '../services/loading';

@Component({
  selector: 'pass',
  templateUrl: './pass.component.html',
  providers: [PassService],
})
export class PassComponent {
  form:FormGroup;
  errorMessage:string;
  resultMessage:string;

  constructor(private service:PassService,
              private builder:FormBuilder,
              private router:Router,
              private user:UserService,
              private loadingService:LoadingService) {

    this.form = builder.group({
      password: ['', Validators.required],
      password_repeat: ['', Validators.required],
    });
  }

  onSubmit(credentials) {
    this.loadingService.show();
    this.service.updatePassword(credentials).then(data => {
      this.loadingService.hide();
      this.errorMessage = null;
      this.resultMessage = data.result;
	  this.errorMessage = JSON.stringify(data.errors);
      this.user.setUpdateStatus(true);
    })
      .catch(error => {
        this.loadingService.hide();
        this.resultMessage = null;
        this.errorMessage = JSON.stringify(error);
        console.log(error);
      });

  }

}
