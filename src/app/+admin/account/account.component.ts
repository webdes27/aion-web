import {Component, OnInit}  from '@angular/core';
import {LazyLoadEvent} from 'primeng/primeng';
import {Item, PrimeItem} from './account';
import {AccountService} from './account.service';
import {LoadingService} from '../../services/loading';

@Component({
  selector: 'my-app',
  templateUrl: './account.component2.html',
  providers: [AccountService]
})

export class AccountComponent implements OnInit {

  items:Item[];
  displayDialog:boolean;
  item:Item = new PrimeItem();
  selectedItem:Item;
  newItem:boolean;
  errorMessage:string;

  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public currentPage: number = 1;

  public columns:Array<any> = [
    {title: 'Id', name: 'id', sort: '', filtering: {filterString: ''}},
    {title: 'Name', name: 'name', sort: '', filtering: {filterString: ''}},
    {title: 'Activated.', name: 'activated', sort: '', filtering: {filterString: ''}},
    {title: 'Access_level.', name: 'access_level', sort: '', filtering: {filterString: ''}},
    {title: 'Membership.', name: 'membership', sort: '', filtering: {filterString: ''}},
  ];

  public config:any = {
    sorting: {columns: this.columns},
    filtering: {filterString: ''}
  };
  public filters: {[s: string]: any;} = {};
  public sortField:string;
  public sortOrder:number;

  constructor(private service:AccountService, private loadingService:LoadingService) {
  }

  getItems() {
    this.loadingService.show();
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

  loadData(event:LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    //console.log(event);
    let page = (event.first / this.itemsPerPage) + 1;
    this.loadingService.show();
    this.service.getItems(page, event.filters, event.sortField, event.sortOrder)
      .then(data => {
        this.loadingService.hide();
        this.items = data.items;
        this.totalItems = data._meta.totalCount;
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
      .delete(this.selectedItem)
      .then(res => {
        this.loadingService.hide();
        this.items = this.items.filter(h => h !== this.item);
        if (this.selectedItem === this.item) {
          this.selectedItem = null;
        }
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

  cloneItem(c:Item):Item {
    let item = new PrimeItem();
    for (let prop in c) {
      item[prop] = c[prop];
    }
    return item;
  }

  findSelectedItemIndex():number {
    return this.items.indexOf(this.selectedItem);
  }

  viewDetails(item:Item) {
    this.displayDialog = true;
  }

  updateItem(item:Item) {
    this.displayDialog = true;
  }

  deleteItem(item:Item) {
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


}
