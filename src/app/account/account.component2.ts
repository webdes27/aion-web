import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Item }                from './account';
import { AccountService }         from './account.service';
import { AccountDetailComponent } from './account-detail.component';
@Component({
  selector: 'accounts',
  template: require('./account.component.html'),
  directives: [AccountDetailComponent],
  providers:[AccountService]
})
export class AccountComponent implements OnInit {
  accounts: Item[];
  selectedAccount: Item;
  addingAccount = false;
  error: any;
  constructor(
    private router: Router,
    private accountService: AccountService) { }
  getAccounts() {
    this.accountService
        .getItems(1)
        .then(data => this.accounts = data.items)
        .catch(error => this.error = error); // TODO: Display error message
  }
  addAccount() {
    this.addingAccount = true;
    this.selectedAccount = null;
  }
  close(savedAccount: Item) {
    this.addingAccount = false;
    if (savedAccount) { this.getAccounts(); }
  }
  delete(account: Item, event: any) {
    event.stopPropagation();
    this.accountService
        .delete(account)
        .then(res => {
          this.accounts = this.accounts.filter(h => h !== account);
          if (this.selectedAccount === account) { this.selectedAccount = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  ngOnInit() {
    this.getAccounts();
  }
  onSelect(account: Item) {
    this.selectedAccount = account;
    this.addingAccount = false;
  }
  gotoDetail() {
    this.router.navigate(['/account/detail', this.selectedAccount.id ]);
  }
}
