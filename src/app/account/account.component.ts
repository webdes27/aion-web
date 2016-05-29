import {Component, OnInit}  from '@angular/core';
import {DataTable, Column, LazyLoadEvent} from 'primeng/primeng';
import {Account, Meta, Link} from './account';
import {AccountService} from './account-service';

@Component({
  selector: 'my-app',
  template: require('./account.html'),
  directives: [DataTable, Column],
  providers:[AccountService]
})

export class AccountComponent implements OnInit {

  items: Account[];
  datasource: Account[];
  totalRecords: number = 0;
  perPage: number = 10;

  errorMessage: string;

  constructor (private _accountService: AccountService) {}

  ngOnInit() {
    this._accountService.getAccounts(1)
                        .then(data => {
                          this.items = data.items;
                          this.totalRecords = data._meta.totalCount;
                          this.perPage = data._meta.perPage;
                        })
                        .catch(error => this.errorMessage = error);
  }

  loadData(event: LazyLoadEvent) {
      //in a real application, make a remote request to load data using state metadata from event
      //event.first = First row offset
      //event.rows = Number of rows per page
      //event.sortField = Field name to sort with
      //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
      console.log(event);
      let page = (event.first/this.perPage)+1;
      this._accountService.getAccounts(page)
                          .then(data => {
                            this.items = data.items;
                            this.totalRecords = data._meta.totalCount;
                          })
                          .catch(error => this.errorMessage = error);
  }

}
