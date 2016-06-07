import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Account }                from './account';
import { AccountService }         from './account.service';
import { AccountDetailComponent } from './account-detail.component';
@Component({
  selector: 'accounts',
  template: require('./account.component.html'),
  directives: [AccountDetailComponent],
  providers:[AccountService]
})
export class AccountComponent implements OnInit {
  accounts: Account[];
  selectedAccount: Account;
  addingAccount = false;
  error: any;
  constructor(
    private router: Router,
    private accountService: AccountService) { }
  getAccounts() {
    this.accountService
        .getAccounts(1)
        .then(data => this.accounts = data.items)
        .catch(error => this.error = error); // TODO: Display error message
  }
  addAccount() {
    this.addingAccount = true;
    this.selectedAccount = null;
  }
  close(savedAccount: Account) {
    this.addingAccount = false;
    if (savedAccount) { this.getAccounts(); }
  }
  delete(account: Account, event: any) {
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
  onSelect(account: Account) {
    this.selectedAccount = account;
    this.addingAccount = false;
  }
  gotoDetail() {
    this.router.navigate(['AccountDetail', { id: this.selectedAccount.id }]);
  }
}
