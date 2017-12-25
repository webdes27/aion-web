import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, ICrudService, YiiService} from '../../shared/crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `<crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class TransactionsComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', formHidden: true},
    {title: 'Ip', name: 'ip'},
    {title: 'Login', name: 'login'},
    {title: 'Char_name', name: 'char_name'},
    {title: 'Item_type', name: 'item_type'},
    {title: 'Item_name', name: 'item_name'},
    {title: 'Count', name: 'count'},
    {title: 'Price_one', name: 'price_one'},
    {title: 'Price_final', name: 'price_final'},
    {title: 'Trans_date', name: 'trans_date', type: 'date'},
  ];
  public settings: Settings = {
    api: CONFIG.apiTransactions,
    crud: true,
    primaryKeys: ['id'],
    tableWidth: 800
  };

  public service: ICrudService;

  constructor(private http: HttpClient) {
    this.service = new YiiService(this.http);
  }
  ngOnInit() {
  }

}
