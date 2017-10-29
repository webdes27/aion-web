import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, ICrudService, YiiService} from '../../shared/crud-table';
import {Http} from '@angular/http';

@Component({
  selector: 'my-app',
  template: `<crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class ShopComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Type', name: 'type', sortable: true, filter: true},
    {title: 'Pic', name: 'pic', sortable: true, filter: true},
    {title: 'Item_name.', name: 'item_name', sortable: true, filter: true},
    {title: 'Description', name: 'description', sortable: true, filter: true},
    {title: 'Price', name: 'price', sortable: true, filter: true},
    {title: 'Status', name: 'status', sortable: true, filter: true},
  ];
  public settings: Settings = {
    api: CONFIG.apiPayShop,
    crud: true,
    primaryKey: 'id',
  };

  public service: ICrudService;

  constructor(private http: Http) {
    this.service = new YiiService(this.http);
  }

  ngOnInit() {
  }

}
