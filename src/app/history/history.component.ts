import {Component, OnInit, ViewChild}  from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import {Item, PrimeItem} from './history';
import {HistoryService} from './history.service';
import {LoadingService} from '../services/loading';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  providers: [HistoryService]
})

export class HistoryComponent implements OnInit {

  @ViewChild('childModal') public childModal:ModalDirective;  

  items:Item[];
  item:Item = new PrimeItem();
  selectedItem:Item;
  newItem:boolean;
  errorMessage:string;

  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public currentPage: number = 1;

  public columns:Array<any> = [
    {title: 'Id', name: 'id', sort: '', filtering: {filterString: ''}},
    {title: 'Ip', name: 'ip', sort: '', filtering: {filterString: ''}},
    {title: 'Login', name: 'login', sort: '', filtering: {filterString: ''}},
    {title: 'Char_name', name: 'char_name', sort: '', filtering: {filterString: ''}},
    {title: 'Item_type', name: 'item_type', sort: '', filtering: {filterString: ''}},
    {title: 'Item_name', name: 'item_name', sort: '', filtering: {filterString: ''}},
    {title: 'Count', name: 'count', sort: '', filtering: {filterString: ''}},
    {title: 'Price_one', name: 'price_one', sort: '', filtering: {filterString: ''}},
    {title: 'Price_final', name: 'price_final', sort: '', filtering: {filterString: ''}},
    {title: 'Trans_date', name: 'trans_date', sort: '', filtering: {filterString: ''}},
  ];

  public config:any = {
    sorting: {columns: this.columns},
    filtering: {filterString: ''}
  };
  public filters: {[s: string]: any;} = {};
  public sortField:string;
  public sortOrder:number;

  constructor(private service:HistoryService, private loadingService:LoadingService) {
  }

  getItems() {
    this.loadingService.show();
    this.errorMessage = null;
    this.service.getItems(this.currentPage, this.filters, this.sortField, this.sortOrder)
      .then(data => {
        this.loadingService.hide();
        this.items = data.items;
        this.totalItems = data._meta.totalCount;
        this.itemsPerPage = data._meta.perPage;
      })
      .catch(error => {
        this.loadingService.hide();
        this.errorMessage = error;
      });
  }

  ngOnInit() {
    this.getItems();
  }

  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getItems();
  }

  save() {
    this.loadingService.show();
    this.errorMessage = null;
    if (this.newItem) {
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
          this.items[this.findSelectedItemIndex()] = item;
        })
        .catch(error => {
          this.loadingService.hide();
          this.errorMessage = error;
        });
    }
    this.childModal.hide();
  }

  delete() {
    this.loadingService.show();
    this.errorMessage = null;
    this.service
      .delete(this.item)
      .then(res => {
        this.loadingService.hide();
        this.items.splice(this.findSelectedItemIndex(), 1);
        this.item = null;
      })
      .catch(error => {
        this.loadingService.hide();
        this.errorMessage = error;
      });
    this.childModal.hide();
  }

  onRowSelect(item:Item) {
    this.newItem = false;
    this.item = this.cloneItem(item);
  }

  cloneItem(item:Item):Item {
    let clone = new PrimeItem();
    for (let prop in item) {
      clone[prop] = item[prop];
    }
    this.selectedItem = Object.assign({}, item);
    return clone;
  }

  findSelectedItemIndex():number {
    let obj = this.items.find(x => JSON.stringify(x) === JSON.stringify(this.selectedItem));
    let index = this.items.indexOf(obj);
    return index;
  }

  createItem() {
    this.newItem = true;
    this.item = new PrimeItem();
    this.childModal.show();
  }

  viewDetails(item:Item) {
    this.childModal.show();
  }

  updateItem(item:Item) {
    this.newItem = false;
    this.item = this.cloneItem(item);
    this.childModal.show();
  }

  deleteItem(item:Item) {
    this.item = this.cloneItem(item);
    this.delete();
  }

  public onChangeTable(config:any):any {
    let sort:string;

    if(config.sort !== undefined) {
      this.sortField = config.name;
      this.sortOrder = (config.sort === 'desc') ? -1 : (config.sort === 'asc') ? 1 : 0;
      sort = config.sort;
    }

    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    this.columns.forEach((column:any) => {
      this.filter(column.filtering.filterString, column.name, '');
      column.sort = '';
      if(column.name === this.sortField) {
        column.sort = sort;
      }
    });

    this.getItems();
  }

    filter(value, field, matchMode) {
        if(!this.isFilterBlank(value))
            this.filters[field] = {value: value, matchMode: matchMode};
        else if(this.filters[field])
            delete this.filters[field];
    }
    
    isFilterBlank(filter: any): boolean {
        if(filter !== null && filter !== undefined) {
            if((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        } 
        return true;
    }

  public hideChildModal():void {
    this.childModal.hide();
  }

  public modalTitle() {
    return (this.newItem) ? 'Добавить' : 'Редактировать';
  }

}
