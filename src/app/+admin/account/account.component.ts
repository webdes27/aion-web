import {Component, OnInit, Inject}  from '@angular/core';

import {Config, APP_CONFIG} from '../../app.config';

@Component({
  selector: 'my-app',
  template: `<h1 class="page-header">Аккаунты</h1>
             <crud-table [api]="api" [columns]="columns"></crud-table>`
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

  constructor(@Inject(APP_CONFIG) private config:Config) {
  }

  ngOnInit() {
    this.api = this.config.apiAccount;
  }

}
