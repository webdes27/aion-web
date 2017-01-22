import { Component, OnInit, ViewChild, Input }  from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { LoadingService } from '../../services/loading';
import { CrudService } from './crud.service';

@Component({
  selector: 'crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.css'],
  providers: [CrudService]
})

export class CrudTableComponent implements OnInit {

  @ViewChild('childModal') public childModal:ModalDirective;  

  @Input() public api: string;
  @Input() public columns: Array<any>;

  items: any[];
  item: any;
  selectedItem: any;
  newItem: boolean;
  errorMessage: string;
  onDetailView: boolean = false;

  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public currentPage: number = 1;

  public filters: {[s: string]: any;} = {};
  public sortField: string;
  public sortOrder: number;
  public filterTimeout: any;
  public filterDelay: number = 300;

  constructor(private service:CrudService, private loadingService:LoadingService) {
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
    this.service.url = this.api;
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
    let clone = Object.assign({}, item);
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
    this.item = {};
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
        if(!column.sortable) {
            return;
        }
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
