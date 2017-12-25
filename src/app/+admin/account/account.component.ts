import {Component, OnInit} from '@angular/core';
import {CONFIG} from '../../app.config';
import {Column, Settings, ICrudService, YiiService} from '../../shared/crud-table';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: `<crud-table [columns]="columns" [settings]="settings" [service]="service"></crud-table>`
})

export class AccountComponent implements OnInit {

  public columns: Column[] = [
    {title: 'Id', name: 'id', formHidden: true},
    {title: 'Name', name: 'name'},
    {title: 'Activated', name: 'activated'},
    {title: 'Access_level', name: 'access_level'},
    {title: 'Membership', name: 'membership'},
  ];
  public settings: Settings = {
    api: CONFIG.apiAccount,
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
