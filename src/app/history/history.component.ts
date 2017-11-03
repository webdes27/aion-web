import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../app.config';
import {Column, Settings, ICrudService, YiiService} from '../shared/crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `<crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class HistoryComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Ip', name: 'ip', sortable: true, filter: true},
    {title: 'Login', name: 'login', sortable: true, filter: true},
    {title: 'Char_name', name: 'char_name', sortable: true, filter: true},
    {title: 'Item_type', name: 'item_type', sortable: true, filter: true},
    {title: 'Item_name', name: 'item_name', sortable: true, filter: true},
    {title: 'Count', name: 'count', sortable: true, filter: true},
    {title: 'Price_one', name: 'price_one', sortable: true, filter: true},
    {title: 'Price_final', name: 'price_final', sortable: true, filter: true},
    {title: 'Trans_date', name: 'trans_date', sortable: true, filter: true, type: 'date'},
  ];
  public settings: Settings = {
    api: CONFIG.apiTransactions,
    crud: false,
    tableWidth: 800
  };

  public service: ICrudService;

  constructor(private http: HttpClient) {
    this.service = new YiiService(this.http);
  }

  ngOnInit() {
  }

}
