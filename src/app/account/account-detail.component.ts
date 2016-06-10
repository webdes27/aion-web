import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Item }        from './account';
import { AccountService } from './account.service';

class PrimeAccount implements Item {
    constructor(public id?, public name?, public activated?, public access_level?, public membership?) {}
}

@Component({
  selector: 'account-detail',
  template: require('./account-detail.component.html'),
  providers:[AccountService]
})

export class AccountDetailComponent implements OnInit {
  @Input() account: Item;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  constructor(
    private accountService: AccountService,
    private routeParams: RouteParams) {
  }
  ngOnInit() {
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id');
      this.navigated = true;
      this.accountService.getItem(id)
          .then(account => this.account = account);
    } else {
      this.navigated = false;
      this.account = new PrimeAccount();
    }
  }
  save() {
    this.accountService
        .save(this.account)
        .then(account => {
          this.account = account; // saved account, w/ id if new
          this.goBack(account);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedAccount: Item = null) {
    this.close.emit(savedAccount);
    if (this.navigated) { window.history.back(); }
  }
}
