import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ExchangeService} from './exchange.service';

@Component({
  selector: 'exchange',
  template: require('./exchange.component.html'),
  directives: [],
  providers:[ExchangeService]
})
export class ExchangeComponent {
  form: FormGroup;
  errorMessage: string;
  resultMessage:string;

  constructor(private service: ExchangeService, private builder: FormBuilder, private router: Router) {

    this.form = builder.group({
      count: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this.service.exchange(credentials).then(data => {
    	this.errorMessage = null;
    	this.resultMessage = data;
		this.service.exchanged.next(true);
      })
      .catch(error => {
      	this.resultMessage = null;
        this.errorMessage = JSON.stringify(error);
        console.log(error);
      });

  }

}
