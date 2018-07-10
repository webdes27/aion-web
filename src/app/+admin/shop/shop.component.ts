import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, DataSource, YiiService, DataManager} from '../../shared/ng-crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `<app-crud-table [dataManager]="dataManager"></app-crud-table>`
})

export class ShopComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', formHidden: true},
    {title: 'Type', name: 'type'},
    {title: 'Pic', name: 'pic'},
    {title: 'Item_name.', name: 'item_name'},
    {title: 'Description', name: 'description'},
    {title: 'Price', name: 'price'},
    {title: 'Status', name: 'status'},
  ];
  public settings: Settings = {
    api: CONFIG.apiPayShop,
    crud: true,
    primaryKeys: ['id'],
  };

  public service: DataSource;
  public dataManager: DataManager;

  constructor(private http: HttpClient) {
    this.service = new YiiService(this.http);
    this.dataManager = new DataManager(this.columns, this.settings, this.service);
  }

  ngOnInit() {
  }

}
