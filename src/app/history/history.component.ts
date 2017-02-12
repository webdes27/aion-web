import {Component, OnInit}  from '@angular/core';

import {CONFIG} from '../app.config';

@Component({
  selector: 'my-app',
  template: `<crud-table [api]="api" [columns]="columns" [settings]="settings"></crud-table>`
})

export class HistoryComponent implements OnInit {

  public api: string; 
  public columns: Array<any> = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Ip', name: 'ip', sortable: true, filter: true},
    {title: 'Login', name: 'login', sortable: true, filter: true},
    {title: 'Char_name', name: 'char_name', sortable: true, filter: true},
    {title: 'Item_type', name: 'item_type', sortable: true, filter: true},
    {title: 'Item_name', name: 'item_name', sortable: true, filter: true},
    {title: 'Count', name: 'count', sortable: true, filter: true},
    {title: 'Price_one', name: 'price_one', sortable: true, filter: true},
    {title: 'Price_final', name: 'price_final', sortable: true, filter: true},
    {title: 'Trans_date', name: 'trans_date', sortable: true, filter: true},
  ];
  public settings:any = {
    crud: false,
    pageHeader: 'История',
  };

  constructor() {
  }

  ngOnInit() {
    this.api = CONFIG.apiTransactions;
  }

}
