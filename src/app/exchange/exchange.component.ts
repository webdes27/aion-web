import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ExchangeService} from './exchange.service';
import {UserService} from '../services/user/user.service';
import {LoadingService} from '../services/loading';

@Component({
  selector: 'exchange',
  templateUrl: './exchange.component.html',
  providers: [ExchangeService],
})
export class ExchangeComponent {
  form:FormGroup;
  errorMessage:string;
  resultMessage:string;

  constructor(private service:ExchangeService,
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
    this.service.exchange(credentials).then(data => {
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
