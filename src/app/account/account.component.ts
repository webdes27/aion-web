import {Component, OnInit}  from '@angular/core';
import {DataTable, Column, LazyLoadEvent, TabPanel, TabView, CodeHighlighter, Header, Footer, Dialog, Button, InputText} from 'primeng/primeng';
import {Account, Meta, Link} from './account';
import {AccountService} from './account.service';

class PrimeAccount implements Account {
    constructor(public id?, public name?, public activated?, public access_level?, public membership?) {}
}

@Component({
  selector: 'my-app',
  template: require('./account.html'),
  directives: [DataTable, Column, TabPanel, TabView, CodeHighlighter, Header, Footer, Dialog, Button, InputText],
  providers:[AccountService]
})

export class AccountComponent implements OnInit {

  items: Account[];
  totalRecords: number = 0;
  perPage: number = 10;

  displayDialog: boolean;
  item: Account = new PrimeAccount();
  selectedItem: Account;
  newItem: boolean;

  errorMessage: string;

  constructor (private _accountService: AccountService) {}

  getAccounts() {
    this._accountService.getAccounts()
                        .then(data => {
                          this.items = data.items;
                          this.totalRecords = data._meta.totalCount;
                          this.perPage = data._meta.perPage;
                        })
                        .catch(error => this.errorMessage = error);
  }

  ngOnInit() {
    this.getAccounts();
  }

  loadData(event: LazyLoadEvent) {
      //event.first = First row offset
      //event.rows = Number of rows per page
      //event.sortField = Field name to sort with
      //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
      //console.log(event);
      let page = (event.first/this.perPage)+1;
      this._accountService.getAccounts(page, event.filters, event.sortField, event.sortOrder)
                          .then(data => {
                            this.items = data.items;
                            this.totalRecords = data._meta.totalCount;
                          })
                          .catch(error => this.errorMessage = error);
  }

    showDialogToAdd() {
        this.newItem = true;
        this.item = new PrimeAccount();
        this.displayDialog = true;
    }

    save() {
        if(this.newItem) {
            this._accountService
                .post(this.item)
                .then(item => {
                  this.item = item;
                  this.items.push(this.item);
                })
                .catch(error => this.errorMessage = error);
          } else {
            this._accountService
                .put(this.item)
                .then(item => {
                  this.item = item;
                  this.items[this.findSelectedItemIndex()] = this.item;
                })
                .catch(error => this.errorMessage = error);
          }
        this.item = null;
        this.displayDialog = false;
    }

    delete() {
        this.items.splice(this.findSelectedItemIndex(), 1);
        this._accountService
              .delete(this.item)
              .then(res => {
                this.items = this.items.filter(h => h !== this.item);
                if (this.selectedItem === this.item) { this.selectedItem = null; }
              })
            .catch(error => this.errorMessage = error);
        this.item = null;
        this.displayDialog = false;
    } 

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

    cloneItem(c: Account): Account {
        let item = new PrimeAccount();
        for(let prop in c) {
            item[prop] = c[prop];
        }
        return item;
    }

    findSelectedItemIndex(): number {
        return this.items.indexOf(this.selectedItem);
    }

}
