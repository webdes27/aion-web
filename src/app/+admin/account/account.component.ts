import {Component, OnInit}  from '@angular/core';

import {CONFIG} from '../../app.config';

@Component({
  selector: 'my-app',
  template: `<crud-table [api]="api" [columns]="columns" [settings]="settings"></crud-table>`
})

export class AccountComponent implements OnInit {

  public api: string; 
  public columns: Array<any> = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Name', name: 'name', sortable: true, filter: true},
    {title: 'Activated', name: 'activated', sortable: true, filter: true},
    {title: 'Access_level', name: 'access_level', sortable: true, filter: true},
    {title: 'Membership', name: 'membership', sortable: true, filter: true},
  ];
  public settings:any = {
    crud: true,
    pageHeader: 'Аккаунты',
  };

  constructor() {
  }

  ngOnInit() {
    this.api = CONFIG.apiAccount;
  }

}
