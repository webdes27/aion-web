import {Component, OnInit, ViewChild, Inject}  from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import {Item, PrimeItem} from './account';
import {LoadingService} from '../../services/loading';
import {CrudService} from '../../services/crud/crud.service';
import {Config, APP_CONFIG} from '../../app.config';

@Component({
  selector: 'my-app',
  templateUrl: './account.component.html',
  providers: [CrudService]
})

export class AccountComponent implements OnInit {

  @ViewChild('childModal') public childModal:ModalDirective;  

  items:any[];
  item:any = new PrimeItem();
  selectedItem:any;
  newItem:boolean;
  errorMessage:string;
  onDetailView: boolean = false;

  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public currentPage: number = 1;

  public columns:Array<any> = [
    {title: 'Id', name: 'id', sortable: true, filtering: {filterString: ''}},
    {title: 'Name', name: 'name', sortable: true, filtering: {filterString: ''}},
    {title: 'Activated', name: 'activated', sortable: true, filtering: {filterString: ''}},
    {title: 'Access_level', name: 'access_level', sortable: true, filtering: {filterString: ''}},
    {title: 'Membership', name: 'membership', sortable: true, filtering: {filterString: ''}},
  ];

  public filters: {[s: string]: any;} = {};
  public sortField:string;
  public sortOrder:number;
  public filterTimeout: any;
  public filterDelay: number = 300;

  constructor(private service:CrudService, private loadingService:LoadingService, @Inject(APP_CONFIG) private config:Config) {
  	service.url = this.config.apiAccount;
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
        this.onDetailView = false;
      })
      .catch(error => {
        this.loadingService.hide();
        this.errorMessage = error;
      });
    this.childModal.hide();
  }

  onRowSelect(item:any) {
    this.newItem = false;
    this.item = this.cloneItem(item);
  }

  cloneItem(item:any) {
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

  updateItem(item:any) {
    this.newItem = false;
    this.item = this.cloneItem(item);
    this.childModal.show();
  }

  deleteItem(item:any) {
    this.item = this.cloneItem(item);
    this.delete();
  }

  viewDetails(item:any) {
    this.item = this.cloneItem(item);
    this.onDetailView = true;
  }

  closeDetails() {
    this.onDetailView = false;
  }

	onFilterInputClick(event) {
	    event.stopPropagation();
	}

    onFilterKeyup(value, field, matchMode) {
        if(this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this.filter(value, field, matchMode);
            this.filterTimeout = null;            
        }, this.filterDelay);
    }

    filter(value, field, matchMode) {
        if(!this.isFilterBlank(value))
            this.filters[field] = {value: value, matchMode: matchMode};
        else if(this.filters[field])
            delete this.filters[field];

        this.getItems();
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

	sort(event, column: any) {
        this.sortOrder = (this.sortField === column.name) ? this.sortOrder * -1 : 1;
        this.sortField = column.name;
        this.getItems();
	}

    getSortOrder(column: any) {
        let order = 0;
        if(this.sortField && this.sortField === column.name) {
            order = this.sortOrder;
        }
        return order;
    }

  public hideChildModal():void {
    this.childModal.hide();
  }

  public modalTitle() {
    return (this.newItem) ? 'Добавить' : 'Редактировать';
  }

  public elemEnabled(name: string) : boolean {
    return (name === 'id') ? false : true;
  }

}
