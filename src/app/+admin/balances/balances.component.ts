import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, ICrudService, YiiService} from '../../shared/crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `<app-crud-table [columns]="columns" [settings]="settings" [service]="service"></app-crud-table>`
})

export class PayBalanceComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', formHidden: true},
    {title: 'Login', name: 'login', editable: true},
    {title: 'Balance', name: 'balance', editable: true},
  ];
  public settings: Settings = {
    api: CONFIG.apiPayBalance,
    crud: true,
    primaryKeys: ['id'],
  };

  public service: ICrudService;

  constructor(private http: HttpClient) {
    this.service = new YiiService(this.http);
  }

  ngOnInit() {
  }

}
