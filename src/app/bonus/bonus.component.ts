import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BonusService} from './bonus.service';
import {UserService} from '../services/user/user.service';
import {LoadingService} from '../services/loading';

@Component({
  selector: 'bonus',
  templateUrl: './bonus.component.html',
  providers: [BonusService],
})
export class BonusComponent {
  form:FormGroup;
  errorMessage:string;
  resultMessage:string;
  bonusReceived:boolean = false;

  constructor(private service:BonusService,
              private builder:FormBuilder,
              private router:Router,
              private user:UserService,
              private loadingService:LoadingService) {

    this.form = builder.group({
      //count: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this.loadingService.show();
    this.service.getBonus(credentials).then(data => {
      this.loadingService.hide();
      this.errorMessage = null;
      this.resultMessage = data;
      this.user.setUpdateStatus(true);
      this.bonusReceived = true;
    })
      .catch(error => {
        this.loadingService.hide();
        this.resultMessage = null;
        this.errorMessage = JSON.stringify(error);
        console.log(error);
      });

  }

}
