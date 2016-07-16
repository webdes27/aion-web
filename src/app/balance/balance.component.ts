import {Component, OnInit}  from '@angular/core';
import {Observable}       from 'rxjs/Observable';
import {BalanceService} from './balance.service';
import {Balance} from './balance';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'my-balance',
  template: require('./balance.component.html'),
  providers:[BalanceService]
})

export class BalanceComponent implements OnInit {
  errorMessage: string;
  items: Balance;
  mode = 'Observable';

  constructor (private statService: BalanceService, private user: UserService) {}

  ngOnInit() {
    if(this.user.isLoggedIn()) {
      this.statService.getData().subscribe(
        data => this.items = data,
        error => this.errorMessage = <any>error);
    }
  }

}
