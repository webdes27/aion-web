import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, ICrudService, YiiService} from '../../shared/crud-table';
import {Http} from '@angular/http';

@Component({
  selector: 'my-app',
  template: `<crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class AccountComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Name', name: 'name', sortable: true, filter: true},
    {title: 'Activated', name: 'activated', sortable: true, filter: true},
    {title: 'Access_level', name: 'access_level', sortable: true, filter: true},
    {title: 'Membership', name: 'membership', sortable: true, filter: true},
  ];
  public settings: Settings = {
    api: CONFIG.apiAccount,
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
