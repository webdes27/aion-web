import {Component, OnInit}  from '@angular/core';
import {DataTable, Column, LazyLoadEvent, TabPanel, TabView, CodeHighlighter, Header, Footer, Dialog, Button, InputText} from 'primeng/primeng';
import {Item, PrimeItem} from './account';
import {AccountService} from './account.service';
import { LoadingIndicator, LoadingService } from '../services/loading/index';

@Component({
  selector: 'my-app',
  template: require('./account.html'),
  directives: [DataTable, Column, TabPanel, TabView, CodeHighlighter, Header, Footer, Dialog, Button, InputText, LoadingIndicator],
  providers:[AccountService, LoadingService]
})

export class AccountComponent implements OnInit {

  items: Item[];
  totalRecords: number = 0;
  perPage: number = 10;

  displayDialog: boolean;
  item: Item = new PrimeItem();
  selectedItem: Item;
  newItem: boolean;

  errorMessage: string;

  constructor (private service: AccountService, private loadingService:LoadingService) {}

  getItems() {
    this.loadingService.show();
    this.service.getItems()
                        .then(data => {
                          this.loadingService.hide();
                          this.items = data.items;
                          this.totalRecords = data._meta.totalCount;
                          this.perPage = data._meta.perPage;
                        })
                        .catch(error => {
                          this.loadingService.hide();
                          this.errorMessage = error;
                        });
  }

  ngOnInit() {
    this.getItems();
  }

  loadData(event: LazyLoadEvent) {
      //event.first = First row offset
      //event.rows = Number of rows per page
      //event.sortField = Field name to sort with
      //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
      //console.log(event);
      let page = (event.first/this.perPage)+1;
      this.loadingService.show();
      this.service.getItems(page, event.filters, event.sortField, event.sortOrder)
                          .then(data => {
                            this.loadingService.hide();
                            this.items = data.items;
                            this.totalRecords = data._meta.totalCount;
                          })
                          .catch(error => {
                            this.loadingService.hide();
                            this.errorMessage = error;
                          });
  }

    showDialogToAdd() {
        this.newItem = true;
        this.item = new PrimeItem();
        this.displayDialog = true;
    }

    save() {
        this.loadingService.show();
        if(this.newItem) {
            this.service
                .post(this.item)
                .then(item => {
                  this.loadingService.hide();
                  this.item = item;
                  this.items.push(this.item);
                })
                .catch(error => {
                  this.loadingService.hide();
                  this.errorMessage = error;
                });
          } else {
            this.service
                .put(this.item)
                .then(item => {
                  this.loadingService.hide();
                  this.item = item;
                  this.items[this.findSelectedItemIndex()] = this.item;
                })
                .catch(error => {
                  this.loadingService.hide();
                  this.errorMessage = error;
                });
          }
        this.item = null;
        this.displayDialog = false;
    }

    delete() {
        this.items.splice(this.findSelectedItemIndex(), 1);
        this.loadingService.show();
        this.service
              .delete(this.item)
              .then(res => {
                this.loadingService.hide();
                this.items = this.items.filter(h => h !== this.item);
                if (this.selectedItem === this.item) { this.selectedItem = null; }
              })
            .catch(error => {
              this.loadingService.hide();
              this.errorMessage = error;
            });
        this.item = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newItem = false;
        this.item = this.cloneItem(event.data);
        this.displayDialog = true;
    }

    cloneItem(c: Item): Item {
        let item = new PrimeItem();
        for(let prop in c) {
            item[prop] = c[prop];
        }
        return item;
    }

    findSelectedItemIndex(): number {
        return this.items.indexOf(this.selectedItem);
    }

}
