import {Component, OnInit, OnDestroy}  from '@angular/core';
import {Observable}       from 'rxjs/Observable';
import {BalanceService} from './balance.service';
import {Balance} from './balance';
import { UserService } from '../services/user/user.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'my-balance',
  template: require('./balance.component.html'),
  providers:[BalanceService]
})

export class BalanceComponent implements OnInit, OnDestroy {
  errorMessage: string;
  items: Balance;
  subscription:Subscription;

  constructor (private balanceService: BalanceService, private user: UserService) {

    this.subscription = this.user._loggedIn.subscribe(
      item => {
        this.getData();
      }
    );

  }

  getData() {
    if(this.user.isLoggedIn()) {
      this.balanceService.getData().subscribe(
        data => this.items = data,
        error => this.errorMessage = <any>error);
    } else {
      this.items = null;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
