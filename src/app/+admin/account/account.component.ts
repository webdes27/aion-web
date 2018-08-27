import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, DataSource, YiiService, DataManager} from '../../shared/ng-crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `<app-crud-table [dataManager]="dataManager"></app-crud-table>`
})

export class AccountComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', formHidden: true, isPrimaryKey: true},
    {title: 'Name', name: 'name'},
    {title: 'Activated', name: 'activated'},
    {title: 'Access_level', name: 'access_level'},
    {title: 'Membership', name: 'membership'},
  ];
  public settings: Settings = {
    api: CONFIG.apiAccount,
    crud: true,
    multipleSort: true,
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
