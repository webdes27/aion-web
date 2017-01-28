import {Component, OnInit, Inject}  from '@angular/core';

import {Config, APP_CONFIG} from '../../app.config';

@Component({
  selector: 'my-app',
  template: `<crud-table [api]="api" [columns]="columns" [settings]="settings"></crud-table>`
})

export class ShopComponent implements OnInit {

  public api: string; 
  public columns: Array<any> = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Type', name: 'type', sortable: true, filter: true},
    {title: 'Pic', name: 'pic', sortable: true, filter: true},
    {title: 'Item_name.', name: 'item_name', sortable: true, filter: true},
    {title: 'Description', name: 'description', sortable: true, filter: true},
    {title: 'Price', name: 'price', sortable: true, filter: true},
    {title: 'Status', name: 'status', sortable: true, filter: true},
  ];
  public settings:any = {
    crud: true,
    pageHeader: 'Магазин',
  };

  constructor(@Inject(APP_CONFIG) private config:Config) {
  }

  ngOnInit() {
    this.api = this.config.apiPayShop;
  }

}
