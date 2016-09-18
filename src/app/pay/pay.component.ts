import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PayService} from './pay.service';
import {UserService} from '../services/user/user.service';
import {LoadingService} from '../services/loading';

@Component({
  selector: 'pay',
  templateUrl: './pay.component.html',
  providers: [PayService],
})
export class PayComponent {
  form:FormGroup;
  errorMessage:string;
  resultMessage:string;

  constructor(private service:PayService,
              private builder:FormBuilder,
              private router:Router,
              private user:UserService,
              private loadingService:LoadingService) {

    this.form = builder.group({
      count: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this.loadingService.show();
    this.service.pay(credentials).then(data => {
      this.loadingService.hide();
      this.errorMessage = null;
      this.resultMessage = data;
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
