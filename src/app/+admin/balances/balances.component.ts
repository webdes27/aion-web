import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, ICrudService, YiiService} from '../../shared/crud-table';
import {Http} from '@angular/http';

@Component({
  selector: 'my-app',
  template: `<crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class PayBalanceComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Login', name: 'login', sortable: true, filter: true, editable: true},
    {title: 'Balance', name: 'balance', sortable: true, filter: true, editable: true},
  ];
  public settings: Settings = {
    api: CONFIG.apiPayBalance,
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
