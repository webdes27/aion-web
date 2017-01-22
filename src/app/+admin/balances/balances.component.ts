import {Component, OnInit, Inject}  from '@angular/core';

import {Config, APP_CONFIG} from '../../app.config';

@Component({
  selector: 'my-app',
  template: `<h1 class="page-header">Балансы</h1>
             <crud-table [api]="api" [columns]="columns"></crud-table>`
})

export class PayBalanceComponent implements OnInit {

  public api: string; 
  public columns: Array<any> = [
    {title: 'Id', name: 'id', sortable: true, filter: true},
    {title: 'Login', name: 'login', sortable: true, filter: true},
    {title: 'Balance', name: 'balance', sortable: true, filter: true},
  ];

  constructor(@Inject(APP_CONFIG) private config:Config) {
  }

  ngOnInit() {
    this.api = this.config.apiPayBalance;
  }

}
