import {Component, OnInit}  from '@angular/core';
import {Observable}       from 'rxjs/Observable';
import {BalanceService} from './balance.service';
import {Balance} from './balance';


@Component({
  selector: 'my-balance',
  template: require('./balance.component.html'),
  providers:[BalanceService]
})

export class BalanceComponent implements OnInit {
  errorMessage: string;
  items: Balance;
  mode = 'Observable';

  constructor (private statService: BalanceService) {}

  ngOnInit() {
    this.statService.getStat().subscribe(
                       data => this.items = data,
                       error =>  this.errorMessage = <any>error);
  }

}
