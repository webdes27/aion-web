import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, DataSource, YiiService, DataManager} from '../../shared/ng-crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `<app-crud-table [dataManager]="dataManager"></app-crud-table>`
})

export class PayBalanceComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', formHidden: true, isPrimaryKey: true},
    {title: 'Login', name: 'login', editable: true},
    {title: 'Balance', name: 'balance', editable: true},
  ];
  public settings: Settings = {
    api: CONFIG.apiPayBalance,
    crud: true,
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
